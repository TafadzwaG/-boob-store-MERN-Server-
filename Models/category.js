import mongoose from "mongoose";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    imagePath: String,
  },

  {
    timestamps: true,
  }
);

//Virtual Field

const Category = mongoose.model("Category", categorySchema);

export default Category;
