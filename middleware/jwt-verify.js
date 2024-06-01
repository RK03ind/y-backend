import jwt from "jsonwebtoken";
import CustomError from "../error/custom-error.js";

const jwtVerify = () => async (req, res, next) => {
  const { session } = req.cookies;
  jwt.verify(session, process.env.JWT_SECRET, (err, decodedPayload) => {
    req.jwtPayload = decodedPayload;
    if (!err) return next();

    if (process.env.NODE_ENV === "development") {
      err.statusCode = 401;
      return next(err);
    }
    throw new CustomError("Invalid JWT, authorization denied", 401);
  });
};

export default jwtVerify;
