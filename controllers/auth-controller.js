import mongoose from "mongoose";
import genId from "../utils/generate-id.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import CustomError from "../error/custom-error.js";

const signup = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const existingUserWithEmail = await User.findOne({ email });

  if (existingUserWithEmail)
    throw new CustomError("User with this email already exists", 400);

  const userId = genId(firstName);

  const hashedUserPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    firstName,
    lastName,
    email,
    userId,
    password: hashedUserPassword,
  });

  await newUser.save();

  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 1000 * 60 * 6, //Equals to 6 hours
  });
  res.send({ success: "true", message: "Successfull signup" });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUserData = await User.findOne({ email });
  const { userId } = existingUserData;
  if (!existingUserData) throw new CustomError("Invalid User ID", 404);

  if (!(await bcrypt.compare(password, existingUserData.password)))
    throw new CustomError("Invalid password", 401);

  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 1000 * 60 * 6, //Equals to 30 mins
  });
  res.send({ success: "true", message: "User Logged In" });
};

export { loginUser, signup };
