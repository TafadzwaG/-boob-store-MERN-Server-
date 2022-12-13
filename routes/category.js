import express from "express";
import {  create } from "../controllers/category.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { userById } from "../controllers/user.js";



const router = express.Router();

router.param("userId", userById);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin ,create)






export default router;