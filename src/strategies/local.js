const { compareSync } = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../database/schemas/User');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id, done);
});
