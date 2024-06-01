import express from "express";
import { signup, loginUser } from "../controllers/auth-controller.js";
import { errorCatcher } from "../middleware/error-catcher.js";
import jwtVerify from "../middleware/jwt-verify.js";

const router = express.Router();

router.post("/signup", errorCatcher(signup));

router.post("/login", errorCatcher(jwtVerify()), errorCatcher(loginUser));

export { router as authRoutes };
