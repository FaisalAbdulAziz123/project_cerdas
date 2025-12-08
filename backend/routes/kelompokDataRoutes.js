import express from "express";
import {
  getAllKelompokData,
  getKelompokDataById,
  createKelompokData,
  updateKelompokData,
  deleteKelompokData,
} from "../controllers/kelompokDataController.js";

const router = express.Router();

// Route API Kelompok Data
// GET /api/kelompok
router.get("/", getAllKelompokData);

// GET /api/kelompok/:id
router.get("/:id", getKelompokDataById);

// POST /api/kelompok
router.post("/", createKelompokData);

// PUT /api/kelompok/:id
router.put("/:id", updateKelompokData);

// DELETE /api/kelompok/:id
router.delete("/:id", deleteKelompokData);

export default router;