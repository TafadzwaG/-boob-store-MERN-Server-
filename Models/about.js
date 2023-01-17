import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const aboutSchema = new mongoose.Schema();

const About = mongoose.model("About", aboutSchema);

export default About;
