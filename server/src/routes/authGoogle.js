const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = Router();

router.get('/', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/failure',
    session: true,
  })
);
router.get('/failure', (req, res) => {
  res.status(400).send('Fail authenticate with google');
});
router.get('/success', (req, res) => {
  console.log(req.user, 'Google use');
  if (req.user) res.send(req.user);
  else res.send(401);
});
router.get('/logout', authController.logout);

module.exports = router;
