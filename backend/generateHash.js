import bcrypt from "bcrypt";

// Script untuk generate hash password
// Jalankan dengan: node generateHash.js

const password = "admin123"; // Password yang ingin di-hash

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Password:", password);
    console.log("Hash:", hash);
    console.log("\nGunakan hash ini untuk INSERT ke database:");
    console.log(`INSERT INTO users (name, email, password, role) VALUES ('Administrator', 'admin@gmail.com', '${hash}', 'admin');`);
  }
});
