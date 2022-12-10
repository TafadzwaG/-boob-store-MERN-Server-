import express from "express";
import { signup } from "../controllers/user.js";
import { userSignupValidator } from "../validator/index.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/signup", userSignupValidator, signup);

export default router;
