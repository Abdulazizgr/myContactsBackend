import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userControllers.js";
import validateTokenHandler from "../middleware/validateTokenHandler.js";

const router = Router();

// Register a new user

router.post("/register", registerUser);

// Login a user

router.post("/login", loginUser);

// Get current user profile

router.get("/profile", validateTokenHandler, getUserProfile);

export default router;
