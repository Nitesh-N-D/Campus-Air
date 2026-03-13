const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const isProduction = process.env.NODE_ENV === "production";
const clientUrl =
  process.env.CLIENT_URL ||
  (isProduction
    ? "https://campus-air.vercel.app"
    : "http://localhost:5173");
const apiUrl =
  process.env.API_URL ||
  (isProduction
    ? "https://campus-air.onrender.com"
    : "http://localhost:5000");
const jwtSecret = process.env.JWT_SECRET || process.env.SESSION_SECRET;
const jwtExpire = process.env.JWT_EXPIRE || "7d";
const adminEmails = [
  "niteshdwaraka@gmail.com",
  "niteshnd2006@gmail.com",
];

function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: jwtExpire }
  );
}

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    authProvider: user.authProvider,
    emailVerified: user.emailVerified,
  };
}

function createTokenPair() {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, hashedToken };
}

async function signup(req, res) {
  const { name, email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();

  if (!name?.trim() || !normalizedEmail || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmail.test(normalizedEmail)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { rawToken, hashedToken } = createTokenPair();

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    authProvider: "local",
    role: adminEmails.includes(normalizedEmail) ? "admin" : "student",
    emailVerified: false,
    verificationToken: hashedToken,
    verificationTokenExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  const verifyUrl = `${apiUrl}/auth/verify-email?token=${rawToken}`;

  await sendEmail(
    normalizedEmail,
    "Verify your Campus Air account",
    `Welcome to Campus Air. Verify your account here: ${verifyUrl}`,
    `<p>Welcome to Campus Air.</p><p>Verify your account by opening this link:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`
  );

  return res.status(201).json({
    message: "Account created. Please verify your email before logging in.",
    user: sanitizeUser(user),
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (user.authProvider === "google" && !user.password) {
    return res.status(400).json({ message: "Use Google sign in for this account" });
  }

  const passwordMatches = await bcrypt.compare(password, user.password || "");

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ message: "Verify your email before logging in" });
  }

  const token = signToken(user);

  return res.status(200).json({
    message: "Login successful",
    token,
    user: sanitizeUser(user),
  });
}

async function forgotPassword(req, res) {
  const normalizedEmail = req.body.email?.trim().toLowerCase();

  if (!normalizedEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return res.status(200).json({
      message: "If the account exists, a password reset link has been sent.",
    });
  }

  const { rawToken, hashedToken } = createTokenPair();

  user.resetToken = hashedToken;
  user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30);
  await user.save();

  const resetUrl = `${clientUrl}/reset-password?token=${rawToken}`;

  await sendEmail(
    normalizedEmail,
    "Reset your Campus Air password",
    `Reset your password here: ${resetUrl}`,
    `<p>You requested a password reset.</p><p>Reset it here:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  );

  return res.status(200).json({
    message: "If the account exists, a password reset link has been sent.",
  });
}

async function resetPassword(req, res) {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ message: "Reset token is invalid or expired" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.authProvider = "local";
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return res.status(200).json({ message: "Password reset successful" });
}

async function verifyEmail(req, res) {
  const token = req.query.token;

  if (!token) {
    return res.redirect(`${clientUrl}/login?verified=0`);
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    verificationToken: hashedToken,
    verificationTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return res.redirect(`${clientUrl}/login?verified=0`);
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  return res.redirect(`${clientUrl}/login?verified=1`);
}

function getCurrentUser(req, res) {
  const user = req.authUser || req.user;

  if (!user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  return res.status(200).json(sanitizeUser(user));
}

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  getCurrentUser,
  sanitizeUser,
};
