const Comment = require('../database/schemas/Comment');
const User = require('../database/schemas/User');
const Review = require('../database/schemas/Review');

class commentController {
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const comments = await Comment.find({ review_id: id });
      res.send(comments);
    } catch (err) {
      console.error(`Error while getting users`, err.message);
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      const { user_id, review_id, text } = req.body;
      let user = !user_id ? req.user : await User.findOne({ _id: user_id });
      const commentDB = await Comment.create({
        user_id,
        review_id,
        text,
        username: user.username,
      });

      await Review.updateOne(
        { id: review_id },
        { $push: { comments: commentDB._id } }
      );

      res.status(201).send(commentDB);
    } catch (err) {
      console.error(`Error while creating`, err.message);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { text } = req.body;
      await Comment.updateOne({ id: req.params.id }, { $set: { text } });
      res.send(200);
    } catch (err) {
      console.error(`Error while updating`, err.message);
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await Comment.deleteOne({ id });
      res.send(200);
    } catch (err) {
      console.error(`Error while deleting`, err.message);
      next(err);
    }
  }
}

module.exports = new commentController();
