import express from "express";
import {
  getAllTema,
  getTemaByIndikator,
  createTema,
  updateTema,
  deleteTema,
} from "../controllers/temaController.js";

const router = express.Router();

// ✅ perbaikan: hapus prefix "/tema"
router.get("/", getAllTema);
router.get("/:id", getTemaByIndikator);
router.post("/", createTema);
router.put("/:id", updateTema);
router.delete("/:id", deleteTema);

export default router;
