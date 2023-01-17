import { check, validationResult } from "express-validator";

export const userSignupValidator = async (req, res, next) => {
  await check("name").not().isEmpty().withMessage("Name is required").run(req);
  await check("email", "Email must be between 3 to 32 characters")
    .not()
    .isEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    })
    .run(req);
  await check("password", "Password is required").notEmpty().run(req);
  await check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must atleast contain 6 caharcters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    const firstError = result['errors'].map(error => error.msg)
    return res.status(400).json({ errors:  firstError });
  }

  next();
};



export const contactValidator = async (req, res, next) => {}

export const commentValidator = async (req, res, next) => {}

