const Review = require('../database/schemas/Review');
const Product = require('../database/schemas/Product');
const Tag = require('../database/schemas/Tag');
const User = require('../database/schemas/User');

class reviewController {
  async get(req, res, next) {
    try {
      const data = JSON.parse(req.query.data)
      const reviews = await Review.find(
        data?.text ? {$text: {$search: data?.text}} : data).sort(data.params);
      res.status(200).send(reviews);
    } catch (err) {
      console.error(`Error while getting users`, err.message);
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const {
        user_id,
        title,
        product,
        text,
        user_rating,
        tags,
        images,
        category,
      } = req.body;
      let user = !user_id ? req.user : await User.findOne({_id: user_id});

      let productDb = await Product.findOne({value: product});
      if (!productDb) {
        productDb = await Product.create({value: product});
      }

      const review = await Review.create({
        product: productDb.value,
        tags,
        user_id: user._id,
        username: user.username,
        title,
        text,
        user_rating,
        category,
        images,
      });

      await Promise.all(
        tags.map(async (name) => {
          let tag = await Tag.findOne({value: name});
          if (!tag) tag = await Tag.create({value: name});
          tag.reviews.push(review._id);
          tag.save();
        })
      );

      res.status(201).send(review);
    } catch (err) {
      console.error(`Error while creating review`, err.message);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const {id} = req.query;
      const {title, text, user_rating, images, tag} = req.body;
      const reviewDb = await Review.updateOne(
        {_id: id},
        {
          $set: {
            title,
            text,
            user_rating,
            images,
            tag,
          },
        }
      );
      res.status(200).send(reviewDb);
    } catch (err) {
      console.error(`Error while updating review`, err.message);
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const {id} = req.query;
      await Review.deleteOne({id});
      await Comment.delete({review_id: id});
      res.send(200);
    } catch (err) {
      console.error(`Error while deleting review`, err.message);
      next(err);
    }
  }

  async addLike(req, res, next) {
    try {
      const {review_id, user_id} = req.body;
      let user = user_id || req.user;
      const review = await Review.findOneAndUpdate({_id: review_id}, {$push: {likes: user._id}});
      res.status(200).send(review);
    } catch (err) {
      console.error(`Error while deleting review`, err.message);
      next(err);
    }
  }

  async removeLike(req, res, next) {
    try {
      const {review_id, user_id} = req.body;
      let user = user_id || req.user;
      const review = await Review.findOneAndUpdate({_id: review_id}, {$pull: {likes: user._id}});
      res.status(200).send(review);
    } catch (err) {
      console.error(`Error while deleting review`, err.message);
      next(err);
    }
  }
}

module.exports = new reviewController();
