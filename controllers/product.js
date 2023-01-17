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

// export const create = async (req, res) => {
//   try {
//     let form = new formidable.IncomingForm();

//     form.keepExtensions = true;

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       }

//       // check for all fields
//       const { name, description, price, category, quantity, shipping, image } = fields;
//       if (
//         !name ||
//         !description ||
//         !price ||
//         !category ||
//         !quantity ||
//         !shipping ||
//         ! image
//       ) {
//         return res.status(400).json({
//           error: "All fields are required",
//         });
//       }

//       let product = new Product(fields);

//       if (files.image) {
//         if (files.image.size > 1000000) {
//           return res.status(400).json({
//             error: "Image should be less than 1MB is size",
//           });
//         }

//         product.image.data = fs.readFileSync(files.image.path);
//         product.image.contentType = files.image.type;
//       }

//       product.save((err, result) => {
//         if (err) {
//           return res.status(400).json({
//             error: "There was an error",
//           });
//         }

//         res.json(result);
//       });
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const create = async (req, res) => {
  try {
    const { name, price, description, category, quantity, imagePath, shipping } =
      req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      quantity,
      imagePath,
      shipping,
    });

    await newProduct.save();

    const product = await Product.find().sort({ createdAt: -1 });
    res.status(201).json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
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
        message: "Product deletion was successful",
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const update = async (req, res) => {
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

      let product = req.product;

      product = _.extend(product, fields);

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

/**
 * Sell / Arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

export const list = async (req, res, next) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/**
 * it will find thge products based on the req product category
 * other products that have the same category will be returned
 */

export const listRelated = async (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

export const listCategories = async (req, res, next) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }

    res.json(categories);
  });
};

/**
 * list products by search
 * we will iplement product search in react front end
 * we will show categories in the checkbox and the price range in the radi buttons
 * as the user clics on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

export const listBySearch = async (req, res, next) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        //gte - greater than price [0-10]
        //lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-image")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

export const productImage = async (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }

  next();
};



export const getProducts = async (req, res) => {
  try {
    Product.find().exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err) || "Error finding Products",
        });
      }

      res.json({ data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};