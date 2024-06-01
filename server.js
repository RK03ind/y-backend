import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import * as dotenv from "dotenv";
import cors from "cors";
import { connectToDB } from "./database/mongodb-connect.js";
import { authRoutes } from "./routes/auth-routes.js";
import errorHandler from "./middleware/error-handler.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

connectToDB();

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000);
