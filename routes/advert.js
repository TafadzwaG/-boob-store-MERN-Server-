import express from "express";

import { read, remove, list, update, advertId } from "../controllers/advert.js";

import { verifyToken, isAuth, requireSignin } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { userById } from "../controllers/user.js";

const router = express.Router();

router.param("userId", userById);
router.param("advertId", advertId);

router.get("/advert/:advertId", read);
router.get("/adverts", list);
router.delete(
  "/advert/:advertId/:userId",
  isAdmin,
  isAuth,
  requireSignin,
  remove
);
router.put("/advert/:advertId/:userId", isAdmin, isAuth, requireSignin, update);

export default router;
