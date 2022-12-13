import Category from "../Models/category.js";
import { errorHandler } from "../helpers/dbErrorHandler.js";

export const create = async (req, res) => {
  try {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {

        console.log(err)
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.json({ data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
