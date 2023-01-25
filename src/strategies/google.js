const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Role = require('../database/schemas/Role');
const User = require('../database/schemas/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const userRole = await Role.findOne({ value: 'User' });
        let userDb = await User.findOne({ googleId: profile.id });
        if (!userDb) {
          userDb = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
            role: userRole.value,
          });
        }
        return cb(null, userDb);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  User.findById(user._id, (err, user) => {
    if (err) {
      cb(null, false, { error: err });
    } else {
      cb(null, user);
    }
  });
});
