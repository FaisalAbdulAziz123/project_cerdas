import express from "express";
// Tambahkan createTestLog di import
import { getAllHistory, createTestLog } from "../controllers/historyController.js";

const router = express.Router();

// Route untuk mengambil data (Dipakai Dashboard)
router.get("/", getAllHistory);

// 👇 Route untuk TESTING MANUAL (Supaya history tidak kosong)
// Akses ini nanti pakai Postman atau script sementara
router.post("/test", createTestLog);

export default router;