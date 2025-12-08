import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cerdas_db", // ganti sesuai nama database kamu
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek ke database:", err);
  } else {
    console.log("✅ Berhasil konek ke database");
  }
});

export default db;
