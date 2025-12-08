import db from "../db.js";

export const updateBackground = (req, res) => {
  const gambar = req.file ? req.file.filename : null;
  
  if (!gambar) return res.status(400).json("Tidak ada gambar diupload");

  // Pastikan ID 1 ada di database!
  const q = "UPDATE background_app SET gambar = ? WHERE id = 1";

  db.query(q, [gambar], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Background berhasil diperbarui!");
  });
};

export const getBackground = (req, res) => {
  const q = "SELECT * FROM background_app WHERE id = 1";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    // Kembalikan objek pertama
    return res.status(200).json(data[0]); 
  });
};