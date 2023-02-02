import { errorHandler } from "../helpers/dbErrorHandler.js";
import Comment from "../Models/comment.js";
import Product from "../Models/product.js";

export const commentById = async (req, res, next, id) => {
  try {
    Comment.findById(id).exec((err, comment) => {
      if (err || !comment) {
        return res.status(400).json({
          error: errorHandler(err) || "There was an error",
        });
      }

      req.comment = comment;
      next();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { stars, name, email, comment, productId, user } = req.body;
    const newComment = new Comment({
      stars,
      name,
      email,
      comment,
      productId,
      user,
    });


    const product = await Product.findById(productId);
    product.comments.push(newComment);

    if (product.comments.length != 0) {
      let averageRating = 0;
      let total = 0;

      product.comments.forEach((comment) => {
        total += comment.stars;
      });
      averageRating = Math.round(total / product.comments.length);

      product.rating = averageRating;
    }

    await Product.findByIdAndUpdate(
      productId,
      { comments: product.comments, rating: product.rating },
      { new: true }
    );

    await newComment.save();

    const newComments = await Comment.find().sort({ createdAt: -1 }).limit(4);
    res.status(201).json(newComments);
   
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    let userComment = req.comment;
    const { stars, name, email, comment, productId, user } = req.body;

    name ? (userComment.name = name) : (userComment.name = userComment.name);
    stars
      ? (userComment.stars = stars)
      : (userComment.stars = userComment.stars);
    stars
      ? (userComment.email = email)
      : (userComment.email = userComment.email);
    stars
      ? (userComment.comment = comment)
      : (userComment.email = userComment.email);

    userComment.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || err,
        });
      }
      res.status(201).json(data);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const readComment = async (req, res) => {
  try {
    return res.json(req.comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const listComments = async (req, res) => {
  try {
    let ProductId = req.query.productId || "";

    Comment.find({ productId: ProductId })
      .populate("user")
      .exec((err, comments) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err) || "Error finding categories",
          });
        }

        res.json({ comments });
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = req.comment;
    const product = await Product.findById(comment.productId);
    const newComments = product.comments.filter(
      (comm) => comm._id != comment._id.toString()
    );
    product.comments = newComments;

    if (product.comments.length != 0) {
      let averageRating = 0;
      let total = 0;
      product.comments.forEach((comment) => {
        total += comment.stars;
      });
      averageRating = Math.round(total / product.comments.length);
      product.rating = averageRating;
    }

    await Product.findByIdAndUpdate(
      comment.productId,
      { comments: product.comments, rating: product.rating },
      { new: true }
    );

    comment.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || "Error whilst removing",
        });
      }
      res.json({
        message: "Comment removed",
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCommentTest = async (req, res) => {
  try {
    let commentId = req.query.commentId || "";
    let product = req.product;

    let comments = product.comments;

    let newAryy = comments.filter(
      (item) => item._id != "63da54752623365b0edd4474"
    );

    // const itemToRemove = comments.find((item) => item._id == "63da54532623365b0edd446f")
    product.comments = newAryy;

    if (product.comments.length != 0) {
      let averageRating = 0;
      let Ratingtotal = product.comments.reduce(
        (total, item) => total + item.stars,
        0
      );
      averageRating = Math.round(Ratingtotal / product.comments.length);
      product.rating = averageRating;
    }

    await Product.findByIdAndUpdate(
      product._id,
      { comments: product.comments, rating: product.rating },
      { new: true }
    );

    res.json({
      product,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
