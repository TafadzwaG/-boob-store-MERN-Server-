import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const testimonialSchema = new mongoose.Schema()


const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;