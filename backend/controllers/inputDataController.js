import db from "../db.js";
import { logActivity } from "./historyController.js";

// ======================================
// CREATE DATA INPUT
// ======================================
export const createInputData = (req, res) => {
  const {
    kelompok,
    indikator,
    judul,
    gambar,
    judulNarasi,
    isiNarasi,
    indikatorId
  } = req.body;

  // 1. Cari ID kelompok_data berdasarkan nama_kelompok
  const kelompokQuery = "SELECT id FROM kelompok_data WHERE nama_kelompok = ?";
  db.query(kelompokQuery, [kelompok], (err, kelompokResult) => {
    if (err) return res.status(500).json({ error: "Error mencari kelompok" });
    if (kelompokResult.length === 0)
      return res.status(400).json({ error: "Kelompok tidak ditemukan" });

    const kelompok_id = kelompokResult[0].id;

    // 2. Cari ID tema berdasarkan judul
    const temaQuery = "SELECT id FROM tema WHERE judul = ?";
    const temaValue = judul === "UPLOAD_GAMBAR" ? null : judul;

    if (!temaValue) {
      // langsung insert jika UPLOAD GAMBAR
      insertData(null);
    } else {
      db.query(temaQuery, [temaValue], (err, temaResult) => {
        if (err) return res.status(500).json({ error: "Error mencari tema" });

        const tema_id = temaResult.length > 0 ? temaResult[0].id : null;

        insertData(tema_id);
      });
    }

    // 3. Fungsi untuk insert data
    function insertData(tema_id) {
      const insertQuery = `
        INSERT INTO data_input
        (kelompok_id, tema_id, indikator, judul, gambar, judulNarasi, isiNarasi)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [
          kelompok_id,
          tema_id,
          indikator,
          judul,
          gambar,
          judulNarasi,
          isiNarasi,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error insert data" });
          }

          // ✅ TAMBAHAN: Catat ke History
          // Kita gunakan judulNarasi agar log lebih spesifik
          logActivity("CREATE", `Menambahkan Data Input Baru: ${judulNarasi}`);

          return res.status(200).json({
            message: "Data berhasil disimpan",
            id: result.insertId,
          });
        }
      );
    }
  });
};


// ======================================
// GET SEMUA DATA INPUT
// ======================================
export const getAllInputData = (req, res) => {
  const query = `
    SELECT 
      d.id,
      k.nama_kelompok AS kelompok,
      t.judul AS tema,
      d.indikator,
      d.judul,
      d.judulNarasi,
      d.isiNarasi,
      d.gambar,
      d.created_at
    FROM data_input d
    LEFT JOIN kelompok_data k ON d.kelompok_id = k.id
    LEFT JOIN tema t ON d.tema_id = t.id
    ORDER BY d.id DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data_input:", err);
      return res.status(500).json({ error: "Gagal mengambil data_input" });
    }
    res.json(results);
  });
};


// ======================================
// GET DATA INPUT BERDASARKAN ID TEMA
// ======================================
export const getInputDataByTema = (req, res) => {
  const { id_tema } = req.params;

  const query = `
    SELECT 
      d.id,
      k.nama_kelompok AS kelompok,
      t.judul AS tema,
      d.indikator,
      d.judul,
      d.judulNarasi,
      d.isiNarasi,
      d.gambar,
      d.created_at
    FROM data_input d
    LEFT JOIN kelompok_data k ON d.kelompok_id = k.id
    LEFT JOIN tema t ON d.tema_id = t.id
    WHERE d.tema_id = ?
    ORDER BY d.id DESC
  `;

  db.query(query, [id_tema], (err, results) => {
    if (err) {
      console.error("Error fetching data_input:", err);
      return res.status(500).json({ error: "Gagal mengambil data_input" });
    }
    res.json(results);
  });
};