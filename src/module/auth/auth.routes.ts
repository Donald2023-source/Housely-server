import express from "express";
import { rateLimiter } from "../../core/rate-limiting.ts";
import { logout, registerUser, loginUser, forgotPassword, validateToken, resetPassword     } from "./auth.controller.ts";
const router = express.Router();

router.post("/register", rateLimiter, registerUser);
router.post("/logout", logout);
router.post("/login", rateLimiter, loginUser);
router.post("/forgot-password", rateLimiter, forgotPassword);
router.post("/validate-token", rateLimiter, validateToken);
router.patch("/reset-password", rateLimiter, resetPassword)
export default router;
