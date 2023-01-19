import Cart from "../Models/cart.js";
import Product from "../Models/product.js";

export const getUserCart = async (req, res) => {
  try {
    const cartOwner = req.params.userId;
    const cart = await Cart.findOne({ cartOwner });
    if (cart && cart.products.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const cartOwner = req.params.userId;

    const cart = await Cart.findOne({ cartOwner });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      res.status(404).send({ message: "Item not found" });
      return;
    }

    const price = product.price;
    const name = product.name;
    const imagePath = product.imagePath;

    //If Cart already exisits

    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );

      //Check if product exists or not
      if (productIndex > -1) {
        let product = cart.products[productIndex];
        product.quantity += quantity;
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        cart.products[productIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.products.push({ productId, name, quantity, price, imagePath, totalPrice : quantity * price });
        cart.bill = cart.products.reduce((acc, curr) => {
          return acc + curr.quantity * curr.price;
        }, 0);
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      // No Cart exists, create one

      const newCart = await Cart.create({
        cartOwner,
        products: [{ productId, name, quantity, price, imagePath , totalPrice : quantity * price}],
        bill: quantity * price,
      });

      res.status(200).send(newCart);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const cartOwner = req.params.userId;
  const productId = req.query.productId;

  try {
    let cart = await Cart.findOne({ cartOwner });
    const productIndex = cart.products.findIndex(
      (product) => product.productId == productId
    );

    if (productIndex > -1) {
      let product = cart.products[productIndex];
      cart.bill -= product.quantity * product.price;
      if (cart.bill < 0) {
        cart.bill = 0;
      }

      cart.products.splice(productIndex, 1);
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      await cart.save();
      res.status(200).send(cart);
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
