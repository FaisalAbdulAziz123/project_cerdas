import db from "../db.js";

export const getAllTema = (req, res) => {
  db.query("SELECT * FROM tema", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const getTemaByIndikator = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM tema WHERE id_indikator = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

export const createTema = (req, res) => {
  const { id_indikator, judul, keterangan } = req.body;
  const sql = "INSERT INTO tema (id_indikator, judul, keterangan) VALUES (?, ?, ?)";
  db.query(sql, [id_indikator, judul, keterangan], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Data berhasil ditambahkan", id: result.insertId });
  });
};

export const updateTema = (req, res) => {
  const { id } = req.params;
  const { judul, keterangan } = req.body;
  const sql = "UPDATE tema SET judul = ?, keterangan = ? WHERE id = ?";
  db.query(sql, [judul, keterangan, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "✅ Data berhasil diperbarui" });
  });
};

export const deleteTema = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tema WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "🗑️ Data berhasil dihapus" });
  });
};
