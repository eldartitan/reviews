const { Router } = require('express');
const otherController = require('../controllers/otherController');
const router = Router();

router.get('/tags', otherController.getTags);
router.get('/categories', otherController.getCategories);

module.exports = router;
