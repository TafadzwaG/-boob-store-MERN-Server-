import Category from "../Models/category.js";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const categoryById = async (req, res, next, id) => {
  try {
    Category.findById(id).exec((err, category) => {
      if (err || !category) {
        return res.status(400).json({
          error: errorHandler(err) || "There was an error",
        });
      }

      req.category = category;
      next();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: errorHandler(err) || "There was an error",
        });
      }

      res.json({ data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const read = async (req, res) => {
  try {
    return res.json(req.category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const list = async (req, res) => {
  try {
    Category.find().exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || "Error finding categories",
        });
      }

      res.json({ data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    let category = req.category;
    const { name, description, imagePath } = req.body;

    name ? (category.name = name) : (category.name = category.name);
    description
      ? (category.description = description)
      : (category.description = category.description);
    imagePath !== "undefined"
      ? (category.imagePath = imagePath)
      : (category.imagePath = category.imagePath);

    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || err,
        });
      }

      res.status(201).json(data);
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = req.category;

    category.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || "Error whilst removing",
        });
      }

      res.json({
        message: "Category removed",
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
