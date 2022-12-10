import { errorHandler } from "../helpers/dbErrorHandler.js";
import User from "../Models/User.js";


export const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err)
        });
      }
      user.salt = undefined
      user.hashed_password = undefined
      res.json({
        user,
      });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
