import express from "express";
import { signup , signin, signout } from "../controllers/user.js";
import { userSignupValidator } from "../validator/index.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout)

export default router;
