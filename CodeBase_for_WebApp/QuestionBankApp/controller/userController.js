const loadAuth = (req, res) => {
  res.render("auth");
};

const successGoogleLogin = (req, res) => {
  if (!req.user) {
    return res.redirect("/failure");
  }
  console.log(req.user); // Log user information
  // Send token and user info to the frontend
  res.redirect(
    // `http://localhost:3001/google-success?token=${req.user.token}&email=${req.user.user.email}`,
    `http://localhost:3001/teacher/dashboard`,
  );
};

const failureGoogleLogin = (req, res) => {
  res.send("Error");
};

module.exports = {
  loadAuth,
  successGoogleLogin,
  failureGoogleLogin,
};
