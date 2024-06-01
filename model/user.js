import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: String, required: true },
});
const User = mongoose.model("user", userSchema, "users");
export default User;
