const express = require('express');

const userRoute = require('./user');
const authRoute = require('./auth');
const authGoogleRoute = require('./authGoogle');
const authDiscordRoute = require('./authDiscord');
const reviewRoute = require('./review');
const commentRoute = require('./comment');
const otherRoute = require('./other');
const adminRoute = require('./admin');
const productRoute = require('./product');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/auth/google', authGoogleRoute);
router.use('/auth/discord', authDiscordRoute);
router.use('/api/user', userRoute);
router.use('/api/reviews', reviewRoute);
router.use('/api/comments', commentRoute);
router.use('/api/other', otherRoute);
router.use('/api/admin', adminRoute);
router.use('/api/products', productRoute);

module.exports = router;
