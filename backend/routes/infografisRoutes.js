import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createInfografis,
  getAllInfografis,
  getInfografisById,
  updateInfografis,
  deleteInfografis,
} from "../controllers/infografisController.js";

const router = express.Router();

// --- KONFIGURASI MULTER (UPLOAD GAMBAR) ---
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Simpan dengan nama unik (timestamp + ekstensi asli)
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// --- DEFINISI ROUTE ---

// Create: Pakai upload.single('gambar')
router.post("/", upload.single('gambar'), createInfografis); 

// Read
router.get("/", getAllInfografis); 
router.get("/:id", getInfografisById); 

// Update: Pakai upload.single('gambar')
router.put("/:id", upload.single('gambar'), updateInfografis); 

// Delete
router.delete("/:id", deleteInfografis); 

export default router;