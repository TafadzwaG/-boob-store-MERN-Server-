import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("User not Authenticated - Access Denied!");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const requireSignin = expressjwt({
  secret: 'jefvjwbhoesbklwtbhowhrtblw/tbn',
  algorithms:['HS256'],
  userProperty: "auth"
})



export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id

  if(!user){
    return res.status(403).json({
      error: "Access Denied!"
    })
  }
  next()
}
