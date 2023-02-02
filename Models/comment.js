import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    stars: {
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },

    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    productId: {
      ref: "Product",
      required: true,
      type: ObjectId,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
