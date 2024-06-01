import mongoose from "mongoose";

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
};

export { connectToDB };
