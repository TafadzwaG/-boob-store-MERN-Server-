import { errorHandler } from "../helpers/dbErrorHandler.js";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

export const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err),
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exists",
        });
      }
      //Authenticate user if user is found

      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password dont match",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

      // persist the token as 't' in cookie with expiry date
      res.cookie("t", token, { expire: new Date() + 9999 });
      //return response with user and token to frontend
      const { _id, name, email, role } = user;
      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("t");
    res.json({
      message: "Signout success"
    })
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
