import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const wishlistSchema = new mongoose.Schema(
  {
    wishlistOwner: {
      type: ObjectId,
      required: true,
      ref: "User",
    },

    items: [
      {
        productId: {
          type: ObjectId,
          required: true,
          ref: "Product",
        },
        price: Number,
        imagePath: String,
        name: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
