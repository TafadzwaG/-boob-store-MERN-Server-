import express from "express";
import {  create ,read, productById, remove, update} from "../controllers/product.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { userById } from "../controllers/user.js";



const router = express.Router();

router.param("userId", userById);
router.param("productId", productById);

router.post("/product/create/:userId", requireSignin, isAuth, isAdmin ,create)
router.get("/product/:productId", read)

router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove )

router.put('/product/:productId/:userId',requireSignin, isAuth, isAdmin, update )






export default router;