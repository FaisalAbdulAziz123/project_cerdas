-- =====================================================
-- SQL QUERIES UNTUK SISTEM LOGIN
-- Database: cerdas_db
-- =====================================================

-- 1. Buat tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Insert user admin default (password: admin123)
-- Password sudah di-hash dengan bcrypt (10 rounds)
-- Password plain: admin123
INSERT INTO users (name, email, password, role) VALUES 
('Administrator', 'admin@gmail.com', '$2b$10$iJDDcrX9KDvNFRmi2JDcW.2OP5ZzOSQRzLw5I3UkKaGljA9cftoZ6', 'admin');

-- Note: Password di atas adalah contoh hash. Untuk membuat hash password baru, 
-- gunakan endpoint POST /api/auth/register atau gunakan bcrypt di Node.js

-- 3. Query untuk login (sudah digunakan di authController.js)
-- SELECT * FROM users WHERE email = 'admin@gmail.com';

-- 4. Insert user baru (jika ingin manual, hash password dulu)
-- INSERT INTO users (name, email, password, role) VALUES ('Nama User', 'user@gmail.com', 'hashed_password', 'user');

-- 5. Update password user
-- UPDATE users SET password = 'new_hashed_password' WHERE email = 'admin@gmail.com';

-- 6. Hapus user
-- DELETE FROM users WHERE email = 'user@gmail.com';

-- 7. Lihat semua users
-- SELECT id, name, email, role, created_at FROM users;
