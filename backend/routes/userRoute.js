import express from "express";
import { getUserProfile, loginUser, registerUser, updateUserProfile } from "../controllers/userController.js";
import userModel from "../models/userModel.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

//Authentication routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//profile routes (require authentication)
userRouter.get("/profile",authMiddleware,getUserProfile);
userRouter.patch("/update-profile",authMiddleware,updateUserProfile);

export default userRouter;

