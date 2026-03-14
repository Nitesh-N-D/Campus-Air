const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = process.env.JWT_SECRET || process.env.SESSION_SECRET;

module.exports = async (req, res, next) => {
  try {
    let user = req.user || req.authUser;

    if (!user) {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json("Not authenticated");
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret);
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json("Not authenticated");
    }

    if (user.role !== "admin") {
      return res.status(403).json("Admin access only");
    }

    req.authUser = user;
    return next();
  } catch (error) {
    return res.status(401).json("Not authenticated");
  }
};
