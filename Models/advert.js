import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const advertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },

    sub_title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    imagePath: String,
  },
  {
    timestamps: true,
  }
);

const Advert = mongoose.model("Advert", advertSchema);

export default Advert;
