import db from "../db.js";
import { logActivity } from "./historyController.js"; // ✅ Import History

// ==========================================
// 1. CREATE INFOGRAFIS (Upload + History)
// ==========================================
export const createInfografis = (req, res) => {
  const { kelompok } = req.body;
  
  // ✅ Ambil nama file dari Multer (jika ada upload)
  // Jika tidak ada file, cek req.body.gambar (kalau kirim string)
  const gambar = req.file ? req.file.filename : req.body.gambar;

  if (!kelompok || !gambar) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const q = `INSERT INTO infografis (kelompok, gambar) VALUES (?, ?)`;

  db.query(q, [kelompok, gambar], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal insert infografis" });

    // ✅ CATAT HISTORY
    logActivity("CREATE", `Menambahkan Infografis Baru: ${kelompok}`);

    return res.status(200).json({
      message: "Infografis berhasil disimpan",
      id: result.insertId,
    });
  });
};

// ==========================================
// 2. GET ALL INFOGRAFIS
// ==========================================
export const getAllInfografis = (req, res) => {
  db.query("SELECT * FROM infografis ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil data infografis" });

    return res.status(200).json(result);
  });
};

// ==========================================
// 3. GET BY ID
// ==========================================
export const getInfografisById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM infografis WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil detail" });

    if (result.length === 0) {
      return res.status(404).json({ error: "Data tidak ditemukan" });
    }

    return res.status(200).json(result[0]);
  });
};

// ==========================================
// 4. UPDATE INFOGRAFIS (Upload + History)
// ==========================================
export const updateInfografis = (req, res) => {
  const { id } = req.params;
  const { kelompok } = req.body;

  // ✅ Cek apakah ada file baru yang diupload?
  // Jika ada req.file, pakai nama file baru. Jika tidak, pakai data lama dari body.
  let gambar = req.body.gambar; 
  if (req.file) {
    gambar = req.file.filename;
  }

  const q = `
      UPDATE infografis
      SET kelompok = ?, gambar = ?
      WHERE id = ?
  `;

  db.query(q, [kelompok, gambar, id], (err) => {
    if (err) return res.status(500).json({ error: "Gagal update infografis" });

    // ✅ CATAT HISTORY
    logActivity("UPDATE", `Mengupdate Infografis ID: ${id}`);

    return res.status(200).json({ message: "Update berhasil" });
  });
};

// ==========================================
// 5. DELETE INFOGRAFIS (History)
// ==========================================
export const deleteInfografis = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM infografis WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Gagal menghapus data" });

    // ✅ CATAT HISTORY
    logActivity("DELETE", `Menghapus Infografis ID: ${id}`);

    return res.status(200).json({ message: "Berhasil dihapus" });
  });
};