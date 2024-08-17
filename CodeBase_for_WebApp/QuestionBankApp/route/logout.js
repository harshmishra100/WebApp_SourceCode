const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
  // If using sessions, destroy session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    // Clear cookies (if necessary)
    res.clearCookie("connect.sid"); // or whatever your cookie name is
    // Redirect to homepage
    res.redirect("/");
  });
});

module.exports = router;
