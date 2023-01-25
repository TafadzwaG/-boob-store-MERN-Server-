import express from "express";
import {
  create,
  read,
  productById,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  productImage,
  getProducts,
  listSearch
} from "../controllers/product.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { userById } from "../controllers/user.js";

const router = express.Router();

router.param("userId", userById);
router.param("productId", productById);
// router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/product/:productId", read);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/products", list);
router.post("/products/search", listSearch)
router.get("/all-products", getProducts);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories)
router.post("/products/by/search", listBySearch)
router.get("/product/image/:productId", productImage)



export default router;
