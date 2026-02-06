import db from "../db.js";
import bcrypt from "bcrypt";

// Login User
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error query database:", err);
      return res.status(500).json({ message: "Error server" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const user = results[0];

    // Cek password (jika menggunakan bcrypt untuk enkripsi)
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Login berhasil
    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// Register User (opsional)
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    
    db.query(query, [name, email, hashedPassword, role || "user"], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email sudah terdaftar" });
        }
        console.error("Error insert user:", err);
        return res.status(500).json({ message: "Error server" });
      }

      res.status(201).json({
        message: "User berhasil didaftarkan",
        userId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Error server" });
  }
};
