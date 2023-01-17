import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const wishlistSchema = new mongoose.Schema()


const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;