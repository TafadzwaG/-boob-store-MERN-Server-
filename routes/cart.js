import express from "express";
import { getUserCart, createCart, deleteCartItem} from "../controllers/cart.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";

import { productById } from "../controllers/product.js";
import { userById } from "../controllers/user.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

router.param("userId", userById);
router.param("productId", productById);

router.get("/cart/:userId", requireSignin, isAuth, getUserCart);
router.post("/cart/:userId", requireSignin, isAuth,  createCart);
router.delete("/cart/delete/:userId", requireSignin, isAuth, deleteCartItem);

export default router;
