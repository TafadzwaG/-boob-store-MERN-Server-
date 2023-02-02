import express from "express";
import { productById } from "../controllers/product.js";
import { userById } from "../controllers/user.js";
import {
  getWishlist,
  removeProductFromWishlist,
  addToWishlist,
} from "../controllers/wishlist.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";

const router = express.Router();

router.param("userId", userById);
router.param("productId", productById);

router.get("/wishlist/:userId", requireSignin, isAuth, getWishlist);
router.post("/wishlist/add/:userId", requireSignin, isAuth, addToWishlist);
router.delete(
  "/wishlist/delete/:productId/:userId",
  requireSignin,
  isAuth,
  removeProductFromWishlist
);

export default router;
