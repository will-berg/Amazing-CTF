const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const initPassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });
          if (!user) {
            return done(null, false, { message: "No user was found" });
          }
          if (!(await bcrypt.compareSync(password, user.password))) {
            return done(null, false, { message: "Password is incorrect" });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};

module.exports = initPassport;
