const { Router } = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = Router();

router.get(
  '/login',
  passport.authenticate('local', {
    failureMessage: true,
  }),
  function (req, res) {
    res.send(req.user);
  }
);
router.get('/logout', authController.logout);
router.post('/register', authController.register);

module.exports = router;
