const Product = require('../database/schemas/Product');
const { average } = require('../utils');

class productController {
  async getProducts(req, res, next) {
    try {
      const products = await Product
        .find(req.query)
        .limit(Number(req.query.limit) || 50);

      res.status(200).send(products);
    } catch (err) {
      console.error(`Error while getting products`, err.message);
      next(err);
    }
  }

  async ratingProducts(req, res, next) {
    try {
      const { product, user_id, value } = req.body;
      const productDb = await Product.findOne({ value: product });
      const filtered = productDb.rating.filter((f) => f.user_id === user_id);

      if (!filtered.length) {
        await Product.updateOne(
          { _id: productDb._id },
          { $push: { rating: { user_id, value } } }
        );
      } else {
        await Product.updateOne(
          { _id: productDb._id, 'rating.user_id': user_id },
          { $set: { 'rating.$.value': value } }
        );
      }

      const updatedProduct = await Product.findOne({ _id: productDb._id });
      const avg = average(updatedProduct.rating.map((m) => Number(m.value)));

      res.status(200).send({
        id: updatedProduct._id,
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
