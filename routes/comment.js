import express from "express";
import {
  commentById,
  createComment,
  readComment,
  listComments,
  deleteComment,
  updateComment,
  deleteCommentTest,
} from "../controllers/comment.js";
import { productById } from "../controllers/product.js";
import { userById } from "../controllers/user.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";

const router = express.Router();

router.param("userId", userById);
router.param("commentId", commentById);
router.param("productId", productById);

router.post("/comment/create/:userId", requireSignin, isAuth, createComment);
router.get("/comments", listComments),
  router.get("/comment/:commentId", readComment);
router.put(
  "/comment/update/:commentId/:userId",
  requireSignin,
  isAuth,
  updateComment
);
router.delete(
  "/comment/delete/:commentId/:userId",
  requireSignin,
  isAuth,
  deleteComment
);

router.delete(
  "/comment/delete-test/:productId/:userId",
  requireSignin,
  isAuth,
  deleteCommentTest
);



export default router;
