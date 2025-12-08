import db from "../db.js";

// ==========================================
// 1. GET ALL HISTORY (Dipakai di Dashboard)
// ==========================================
export const getAllHistory = (req, res) => {
  // Ambil 20 aktivitas terakhir, urutkan dari yang paling baru
  const q = "SELECT * FROM history_logs ORDER BY created_at DESC LIMIT 20";
  
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

// ==========================================
// 2. FUNGSI PENCATAT (Helper Internal)
// ==========================================
// Fungsi ini WAJIB ADA supaya bisa dipanggil oleh controller lain
export const logActivity = (action, description) => {
  const q = "INSERT INTO history_logs (action_type, description) VALUES (?, ?)";
  
  db.query(q, [action, description], (err) => {
    if (err) {
      console.error("❌ Gagal mencatat history:", err);
    } else {
      console.log(`📝 History tercatat: [${action}] ${description}`);
    }
  });
};

// ==========================================
// 3. FUNGSI TESTING (Manual Trigger)
// ==========================================
export const createTestLog = (req, res) => {
  // Memanggil fungsi helper di atas
  logActivity("TEST", "Ini adalah log percobaan manual");
  
  return res.json({ message: "Log percobaan berhasil dibuat!" });
};