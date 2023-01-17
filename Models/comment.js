import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema()


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;