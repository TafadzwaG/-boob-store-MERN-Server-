import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const contactSchema = new mongoose.Schema()


const Contact = mongoose.model("Contact", contactSchema);

export default Contact;