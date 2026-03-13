const router = require("express").Router();
const passport = require("passport");
const isProduction = process.env.NODE_ENV === "production";
const clientUrl =
  process.env.CLIENT_URL ||
  (isProduction
    ? "https://campus-air.vercel.app"
    : "http://localhost:5173");

function handleLogout(req, res, next) {
  req.logout((logoutError) => {
    if (logoutError) {
      return next(logoutError);
    }

    if (!req.session) {
      return res.status(200).json({ success: true });
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie("connect.sid", {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction
      });

      return res.status(200).json({ success: true });
    });
  });
}

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
     failureRedirect: clientUrl + "/login",
  }),
  (req, res) => {
    res.redirect(clientUrl + "/dashboard");
  }
);

router.get("/logout", handleLogout);
router.post("/logout", handleLogout);

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
