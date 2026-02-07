import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { FaUser, FaKey } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cek apakah user sudah login, jika sudah redirect ke dashboard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIX: Syntax Fetch diperbaiki (tambah koma dan struktur dirapikan)
      const response = await fetch("https://tight-jillian-cerdas-da4a09ea.koyeb.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Cek apakah response adalah JSON valid
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error: Respons bukan JSON. Mungkin endpoint salah atau server down.");
      }

      const data = await response.json();

      if (response.ok) {
        // Simpan data user ke localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("✅ Login berhasil! Selamat datang.");
        navigate("/dashboard");
      } else {
        alert("❌ Login Gagal: " + (data.message || "Email atau password salah."));
      }

    } catch (error) {
      console.error("Error login:", error);
      
      // Pesan error disesuaikan untuk User (Server Online)
      if (error.message.includes("Failed to fetch")) {
        alert("❌ Gagal terhubung ke Server!\n\nKemungkinan penyebab:\n1. Masalah koneksi internet.\n2. Server Backend di Koyeb sedang restart/down.\n3. Masalah CORS (Pastikan Backend sudah diizinkan untuk publik).");
      } else {
        alert("Terjadi kesalahan: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">   {/* ✅ wrapper biru */}
      <div className="login-container">
        <div className="login-card">
          <img className="logo" src={logo} alt="BPS Logo" />

          <h4 className="title">BADAN PUSAT STATISTIK</h4>
          <p className="subtitle">KOTA SUKABUMI</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="email"
                required
              />
              <span className="icon"><FaUser /></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="password"
                required
              />
              <span className="icon"><FaKey /></span>
            </div>

            <div className="btn-row">
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          <div className="footer-text">
            <h3>CERDAS</h3>
            <p className="subtitle">CECK RINGKASAN DATA STATISTIK</p>
            <p className="subtitle">KOTA SUKABUMI</p>
          </div>
        </div>
      </div>
    </div>
  );
}