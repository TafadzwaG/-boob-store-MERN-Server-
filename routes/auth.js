import express from "express";
import { signup , signin, signout } from "../controllers/auth.js";
import { userSignupValidator } from "../validator/index.js";
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout)





export default router;
