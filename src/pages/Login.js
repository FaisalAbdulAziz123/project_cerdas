import React, { useState } from "react";
import "../styles/Login.css";
import { FaUser, FaKey } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      alert("Email atau password salah!");
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
              <button type="submit" className="login-btn">Login</button>
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
