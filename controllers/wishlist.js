import Product from "../Models/product.js";
import Wishlist from "../Models/wishlist.js";

// Add To Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlistOwner = req.params.userId;

    const wishlist = await Wishlist.findOne({ wishlistOwner });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      res.status(404).send({ message: "No Product with that Id" });
    }

    const name = product.name;
    const price = product.price;
    const imagePath = product.imagePath;

    if (wishlist) {
      //Returns the index of the product if it exists else
      //It returns - 1
      const productIndex = wishlist.items.findIndex(
        (product) => product.productId == productId
      );
      if (productIndex > -1) {
        let product = wishlist.items[productIndex];
        res.status(200).send({
          message: "The product is alraed in the wishlist",
          product,
        });
      } else {
        wishlist.items.push({ productId, price, name, imagePath });
        await wishlist.save();
        res.status(200).send(wishlist);
      }
    } else {
      // Creating a wishlist if it doesnt exist
      const newWishlist = await Wishlist.create({
        wishlistOwner,
        items: [
          {
            productId,
            price,
            imagePath,
            name,
          },
        ],
      });

      res.status(200).send(newWishlist);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeProductFromWishlist = async (req, res) => {
  try {
    const wishlistOwner = req.params.userId;
    const productId = req.params.productId;

    let wishlist = await Wishlist.findOne({ wishlistOwner });
    const productIndex = wishlist.items.findIndex(
      (product) => product.productId == productId
    );

    if (productIndex > -1) {
      const splicedArr = wishlist.items.splice(productIndex, 1);
      await wishlist.save();

      res.status(200).send(wishlist);
    } else {
      res.status(404).json({
        message: "Product Not In Wishlist",
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlistOwner = req.params.userId;

    const wishlist = await Wishlist.findOne({ wishlistOwner });

    if (wishlist && wishlist.items.length > 0) {
      res.status(200).send(wishlist);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
