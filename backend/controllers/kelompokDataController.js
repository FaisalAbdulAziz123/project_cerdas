import db from "../db.js";

// ==============================
// 1. GET Semua Kelompok Data
// ==============================
export const getAllKelompokData = (req, res) => {
  db.query(
    "SELECT id, nama_kelompok, keterangan, icon FROM kelompok_data",
    (err, results) => {
      if (err) {
        console.error("Error fetching all kelompok data:", err);
        return res
          .status(500)
          .json({ error: "Gagal mengambil data kelompok" });
      }
      res.json(results);
    }
  );
};

// ==============================
// 2. GET Berdasarkan ID
// ==============================
export const getKelompokDataById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT id, nama_kelompok, keterangan, icon FROM kelompok_data WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(`Error fetching kelompok data ID ${id}:`, err);
        return res
          .status(500)
          .json({ error: "Gagal mengambil kelompok data" });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Kelompok data tidak ditemukan" });
      }
      res.json(results[0]);
    }
  );
};

// ==============================
// 3. CREATE Kelompok Data
// ==============================
export const createKelompokData = (req, res) => {
  const { kelompok, keterangan, icon } = req.body;

  const sql =
    "INSERT INTO kelompok_data (nama_kelompok, keterangan, icon) VALUES (?, ?, ?)";

  db.query(sql, [kelompok, keterangan, icon], (err, result) => {
    if (err) {
      console.error("Error creating kelompok data:", err);
      return res
        .status(500)
        .json({ error: "Gagal menambahkan kelompok data" });
    }
    res.json({
      message: "✅ Kelompok data berhasil ditambahkan",
      id: result.insertId,
    });
  });
};

// ==============================
// 4. UPDATE Kelompok Data
// ==============================
export const updateKelompokData = (req, res) => {
  const { id } = req.params;
  const { kelompok, keterangan, icon } = req.body;

  const sql =
    "UPDATE kelompok_data SET nama_kelompok = ?, keterangan = ?, icon = ? WHERE id = ?";

  db.query(sql, [kelompok, keterangan, icon, id], (err) => {
    if (err) {
      console.error(`Error updating kelompok data ID ${id}:`, err);
      return res
        .status(500)
        .json({ error: "Gagal memperbarui kelompok data" });
    }
    res.json({ message: "✅ Kelompok data berhasil diperbarui" });
  });
};

// ==============================
// 5. DELETE Kelompok Data
// ==============================
export const deleteKelompokData = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM kelompok_data WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(`Error deleting kelompok data ID ${id}:`, err);
      return res
        .status(500)
        .json({ error: "Gagal menghapus kelompok data" });
    }
    res.json({ message: "🗑️ Kelompok data berhasil dihapus" });
  });
};
