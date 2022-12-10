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
    return res.status(400).json({ errors: result.array() });
  }

  next();
};

// export const checkingValidation = (req, res, next) => {
//   const errors = validationResult(req);
//   console.log(req.body);
//   if (!errors.isEmpty()) {
//     return res.status(422).jsonp(errors.array());
//   }
//   next();
// };
