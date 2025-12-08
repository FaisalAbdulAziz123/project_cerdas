import express from "express";
import { createInputData,getAllInputData, getInputDataByTema } from "../controllers/inputDataController.js";

const router = express.Router();

router.post("/input-data", createInputData);
router.get("/data_input", getAllInputData);
router.get("/data_input/:id_tema", getInputDataByTema);

export default router;
