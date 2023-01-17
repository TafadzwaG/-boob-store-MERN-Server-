import User from "../Models/User.js";

export const userById = async (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    req.profile = user;
    next();
  });
};

export const read = async (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};
export const update = async (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "You are not authorised to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user)
    }
  );
};
