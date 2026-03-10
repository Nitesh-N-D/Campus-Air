const router = require("express").Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + "/dashboard");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
     res.redirect(process.env.CLIENT_URL);
  });
});
router.get("/current_user", (req, res) => {
  res.send(req.user);
});
module.exports = router;