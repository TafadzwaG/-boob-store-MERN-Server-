import { errorHandler } from "../helpers/dbErrorHandler.js";
import Advert from "../Models/advert.js";

export const advertId = async (req, res, next, id) => {
  try {
    Advert.findById(id).exec((err, advert) => {
      if (err || !advert) {
        return res.status(400).json({
          error: "Advert not found",
        });
      }

      req.advert = advert;
      next();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAdvert = async (req, res, next) => {
  try {
    const { title, sub_title, imagePath } = req.body;

    const advert = new Advert({
      title,
      sub_title,
      imagePath,
    });
    advert.save((err, data) => {
       
      if (err || !advert) {
        console.log(err)
        return res.status(400).json({
          error: err,
        });
      }

      res.json({ data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const read = async (req, res, next) => {
  try {
    return res.json(req.advert);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const remove = async (req, res, next) => {
  try {
    const advert = req.advert;

    advert.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || "Error whilst removing",
        });
      }

      res.json({
        message: "Advert removed",
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};



export const list = async (req, res, next) => {
  try {
    Advert.find().exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || "Error finding advert",
        });
      }

      res.json({ data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const update = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
