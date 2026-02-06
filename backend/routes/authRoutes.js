import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Route Login
router.post("/login", login);

// Route Register (opsional)
router.post("/register", register);

export default router;
