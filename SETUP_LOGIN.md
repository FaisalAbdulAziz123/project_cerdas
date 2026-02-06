# Setup Login dengan Database MySQL

## Langkah-langkah Setup:

### 1. Persiapan Database

Buka MySQL (phpMyAdmin atau MySQL Workbench) dan jalankan query berikut:

```sql
-- Buat database (jika belum ada)
CREATE DATABASE IF NOT EXISTS cerdas_db;
USE cerdas_db;

-- Buat tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert user admin default
-- Email: admin@gmail.com
-- Password: admin123
INSERT INTO users (name, email, password, role) VALUES 
('Administrator', 'admin@gmail.com', '$2b$10$iJDDcrX9KDvNFRmi2JDcW.2OP5ZzOSQRzLw5I3UkKaGljA9cftoZ6', 'admin');
```

### 2. Konfigurasi Database

Buka file `backend/db.js` dan sesuaikan konfigurasi:

```javascript
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Sesuaikan password MySQL Anda
  database: "cerdas_db",
});
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

### 4. Jalankan Backend Server

```bash
cd backend
npm start
```

Server akan berjalan di http://localhost:5000

### 5. Jalankan Frontend

Di terminal baru:

```bash
npm start
```

Frontend akan berjalan di http://localhost:3000

## Kredensial Login Default

- **Email**: admin@gmail.com
- **Password**: admin123

## API Endpoints

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

### Register (Opsional)
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Nama User",
  "email": "user@gmail.com",
  "password": "password123",
  "role": "user"
}
```

## Troubleshooting

### Error: "Error server" atau "Cannot POST /api/auth/login"
- Pastikan backend server sudah berjalan
- Cek apakah database sudah dibuat dan tabel users sudah ada
- Cek koneksi database di `backend/db.js`

### Error: "Email atau password salah"
- Pastikan email dan password sesuai dengan data di database
- Untuk admin default: email: admin@gmail.com, password: admin123

### Error: Port already in use
- Matikan aplikasi lain yang menggunakan port 5000
- Atau ubah PORT di `backend/server.js`

## Generate Hash Password Baru

Jika ingin membuat user baru dengan password terenkripsi:

```bash
cd backend
node generateHash.js
```

Kemudian copy hash yang dihasilkan dan gunakan di query INSERT.
