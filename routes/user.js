import express from "express";
import { userById } from "../controllers/user.js";
import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

router.param("userId", userById);
router.get(
  "/secret/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  (req, res) => {
    res.json({
      user: req.profile,
    });
  }
);

export default router;
