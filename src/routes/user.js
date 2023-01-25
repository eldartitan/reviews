const { Router } = require('express');
const userController = require('../controllers/userController');
const { isLoggedInSafe } = require('../middlewares');
const router = Router();

router.get('/', userController.get);
router.put('/:id', isLoggedInSafe, userController.update);
router.delete('/:id', isLoggedInSafe, userController.remove);

module.exports = router;
