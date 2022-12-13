import Product from "../Models/product.js";
import * as _ from "lodash";
import formidable from "formidable";
import fs from "fs";

export const productById = async (req, res, next, id) => {
  try {
    Product.findById(id).exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }

      req.product = product;
      next();
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }

      // check for all fields
      const { name, description, price, category, quantity, shipping } = fields;
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({
          error: "All fields are required",
        });
      }

      let product = new Product(fields);

      if (files.image) {
        if (files.image.size > 1000000) {
          return res.status(400).json({
            error: "Image should be less than 1MB is size",
          });
        }

        product.image.data = fs.readFileSync(files.image.path);
        product.image.contentType = files.image.type;
      }

      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: "There was an error",
          });
        }

        res.json(result);
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const read = async (req, res, next) => {
  try {
    req.product.image = undefined;
    return res.status(200).json(req.product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const remove = async (req, res, next) => {
  try {
    let product = req.product;
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "There was an error",
        });
      }

      res.json({
        message : "Product deletion was successful"
      })
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const update = async (req, res)  => {
    try {
        let form = new formidable.IncomingForm();
    
        form.keepExtensions = true;
    
        form.parse(req, (err, fields, files) => {
          if (err) {
            return res.status(400).json({
              error: "Image could not be uploaded",
            });
          }
    
          // check for all fields
          const { name, description, price, category, quantity, shipping } = fields;
          if (
            !name ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping
          ) {
            return res.status(400).json({
              error: "All fields are required",
            });
          }
    
          let product = req.product

          product = _.extend(product, fields)
    
          if (files.image) {
            if (files.image.size > 1000000) {
              return res.status(400).json({
                error: "Image should be less than 1MB is size",
              });
            }
    
            product.image.data = fs.readFileSync(files.image.path);
            product.image.contentType = files.image.type;
          }
    
          product.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "There was an error",
              });
            }
    
            res.json(result);
          });
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}