const Product = require('../database/schemas/Product');
const { average } = require('../utils');

class productController {
  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });
      const avg = average(product.rating.map((m) => Number(m.value)));

      res.status(200).send({
        id: product.id,
        value: product.value,
        rating_avg: avg,
        rating: product.rating,
      });
    } catch (err) {
      console.error(`Error while getting product`, err.message);
      next(err);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (err) {
      console.error(`Error while getting products`, err.message);
      next(err);
    }
  }

  async ratingProducts(req, res, next) {
    try {
      const { product_id, user_id, value } = req.body;
      const product = await Product.findOne({ _id: product_id });
      const filtered = product.rating.filter((f) => f.user_id === user_id);

      if (!filtered.length) {
        await Product.updateOne(
          { _id: product_id },
          { $push: { rating: { user_id, value } } }
        );
      } else {
        await Product.updateOne(
          { _id: product_id, 'rating.user_id': user_id },
          { $set: { 'rating.$.value': value } }
        );
      }

      const updatedProduct = await Product.findOne({ _id: product_id });
      const avg = average(updatedProduct.rating.map((m) => Number(m.value)));

      res.status(200).send({
        id: updatedProduct.id,
        value: updatedProduct.value,
        rating_avg: avg,
        rating: updatedProduct.rating,
      });
    } catch (err) {
      console.error(`Error while updating`, err.message);
      next(err);
    }
  }
}

module.exports = new productController();
