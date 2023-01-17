// Add To Wishlist
export const addProductToWishlist = async (req, res, next, id) => {};

export const removeProductFromWishlist = async (req, res, next, id) => {};

export const getWishlist = async (req, res, next, id) => {};

export const test = async (req, res) => {
  try {
    const testArray = [1, 2, 3, 4];

    res.json({testArray})
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
