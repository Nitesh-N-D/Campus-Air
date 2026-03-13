const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const isProduction = process.env.NODE_ENV === "production";
const apiUrl =
  process.env.API_URL ||
  (isProduction
    ? "https://campus-air.onrender.com"
    : "http://localhost:5000");

const adminEmails = [
  "niteshdwaraka@gmail.com",
  "niteshnd2006@gmail.com",
];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${apiUrl}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();
        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email }],
        });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            role: adminEmails.includes(email) ? "admin" : "student",
            profileImage: profile.photos?.[0]?.value,
            authProvider: "google",
            emailVerified: true,
          });
        } else {
          user.googleId = profile.id;
          user.name = user.name || profile.displayName;
          user.profileImage = user.profileImage || profile.photos?.[0]?.value;
          user.authProvider = user.password ? user.authProvider : "google";
          user.emailVerified = true;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
