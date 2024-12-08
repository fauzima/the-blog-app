import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export class AuthMiddleware {
  validateRegistration = [
    body("username").notEmpty().withMessage("Username is required!"),
    body("email")
      .notEmpty()
      .withMessage("Email address is required!")
      .isEmail()
      .withMessage("Invalid email address format!"),
    body("password")
      .notEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 3 })
      .withMessage("Password is minimum 3 characters long!"),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm password is required!")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password doesn't match");
        }
        return true;
      }),

    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      next();
    },
  ];
}
