import express from "express";
import {  create, read ,categoryById, update, deleteCategory, list } from "../controllers/category.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { userById } from "../controllers/user.js";



const router = express.Router();

router.param("userId", userById);
router.param("categoryId", categoryById)
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin ,create)
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin ,update)
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin ,deleteCategory)
router.get("/category/:categoryId", read)
router.get("/categories", list)





export default router;