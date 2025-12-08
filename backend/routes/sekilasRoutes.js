import express from "express";
import {
  createSekilas,
  getAllSekilas,
  getSekilasById,
  updateSekilas,
  deleteSekilas,
} from "../controllers/sekilasController.js";

const router = express.Router();

router.post("/sekilas", createSekilas);
router.get("/sekilas", getAllSekilas);
router.get("/sekilas/:id", getSekilasById);
router.put("/sekilas/:id", updateSekilas);
router.delete("/sekilas/:id", deleteSekilas);

export default router;
