const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const Role = require('../database/schemas/Role');
const User = require('../database/schemas/User');

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/auth/discord/callback`,
      scope: ['identify', 'email', 'guilds', 'guilds.join'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRole = await Role.findOne({ value: 'User' });
        let userDb = await User.findOne({ discordId: profile.id });
        if (!userDb) {
          userDb = await User.create({
            discordId: profile.id,
            username: profile.username,
            email: profile.email,
            role: userRole.value,
          });
        }
        return done(null, userDb);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
