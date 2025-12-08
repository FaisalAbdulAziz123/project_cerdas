import db from "../db.js";

// CREATE
export const createSekilas = (req, res) => {
  const { judulNarasi, isiNarasi, gambar } = req.body;

  if (!judulNarasi || !isiNarasi) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const q = `
    INSERT INTO sekilas_sukabumi (judulNarasi, isiNarasi, gambar)
    VALUES (?, ?, ?)
  `;

  db.query(q, [judulNarasi, isiNarasi, gambar], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal insert sekilas" });

    return res.status(200).json({
      message: "Sekilas Kota Sukabumi berhasil disimpan",
      id: result.insertId,
    });
  });
};

// GET ALL
export const getAllSekilas = (req, res) => {
  db.query("SELECT * FROM sekilas_sukabumi ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil data sekilas" });

    return res.status(200).json(result);
  });
};

// GET BY ID
export const getSekilasById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM sekilas_sukabumi WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil detail data" });

    if (result.length === 0) return res.status(404).json({ error: "Data tidak ditemukan" });

    return res.status(200).json(result[0]);
  });
};

// UPDATE
export const updateSekilas = (req, res) => {
  const { id } = req.params;
  const { judulNarasi, isiNarasi, gambar } = req.body;

  const q = `
      UPDATE sekilas_sukabumi
      SET judulNarasi = ?, isiNarasi = ?, gambar = ?
      WHERE id = ?
  `;

  db.query(q, [judulNarasi, isiNarasi, gambar, id], (err) => {
    if (err) return res.status(500).json({ error: "Gagal update sekilas" });

    return res.status(200).json({ message: "Update berhasil" });
  });
};

// DELETE
export const deleteSekilas = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM sekilas_sukabumi WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Gagal menghapus data sekilas" });

    return res.status(200).json({ message: "Berhasil dihapus" });
  });
};
