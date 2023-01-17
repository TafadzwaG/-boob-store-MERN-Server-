import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    cartOwner: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: ObjectId,
          required: true,
          ref: "Product",
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
        imagePath: String
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
