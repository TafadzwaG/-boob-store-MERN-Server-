import express from "express";
import { userById } from "../controllers/user.js";
import { test } from "../controllers/wishlist.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";

const router = express.Router();

router.param("userId", userById);

router.get("/wishlist/:userId", requireSignin, isAuth, test);

export default router;
