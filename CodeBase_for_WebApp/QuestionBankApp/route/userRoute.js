const express = require("express");
const router = express();
var passport = require("passport");
require("../config/passport");
passport.initialize();
router.use(passport.initialize());
router.use(passport.session());

const userController = require("../controller/userController");

router.get("/", userController.loadAuth);

// Auth
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

// Auth Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
  }),
  userController.successGoogleLogin,
);

// Success
router.get("/success", userController.successGoogleLogin);

// Failure
router.get("/failure", userController.failureGoogleLogin);

module.exports = router;
