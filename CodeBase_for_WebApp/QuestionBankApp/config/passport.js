const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { users } = require("../db/models");
const jwt = require("jsonwebtoken");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await users.findOne({
          where: { email: profile.emails[0].value },
        });
        if (!user) {
          user = await users.create({
            userType: "teacher",
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            password: profile.name.givenName,
          });
        }
        const token = jwt.sign(
          { id: user.id, userType: user.userType },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "90d" },
        );
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

/*
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
*/

module.exports = passport;
