import express from "express";
import cors from "cors";
import path from "path";

// Import Routes
import temaRoutes from "./routes/temaRoutes.js";
import kelompokDataRoutes from "./routes/kelompokDataRoutes.js";
import inputDataRoutes from "./routes/inputDataRoutes.js";
import sekilasRoutes from "./routes/sekilasRoutes.js";
import infografisRoutes from "./routes/infografisRoutes.js";
import backgroundRoutes from "./routes/backgroundRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

const app = express();
const PORT = 5000;

// 1. Middleware Global
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// 2. Folder Static (Wajib agar gambar bisa diakses)
app.use('/uploads', express.static('uploads'));

// 3. Routes
app.use("/tema", temaRoutes);
app.use("/kelompok", kelompokDataRoutes);
app.use("/api", inputDataRoutes); // Prefix /api
app.use("/infografis", infografisRoutes);
app.use("/api", sekilasRoutes); // Prefix /api
app.use("/api/background", backgroundRoutes); // Prefix /api/background
app.use("/api/history", historyRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});