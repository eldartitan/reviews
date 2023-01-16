const { Router } = require('express');
const productController = require('../controllers/productController');
const { isLoggedIn } = require('../middlewares');
const router = Router();

router.post('/rating', isLoggedIn, productController.ratingProducts);
router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);

module.exports = router;
