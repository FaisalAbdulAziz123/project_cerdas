// src/components/Sidebar.js
import React, { useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaDatabase,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/kaca 1.png";
import logoFooter from "../assets/logo.png";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen, onClose }) {
  const [openKerangka, setOpenKerangka] = useState(false);
  const navigate = useNavigate();

  const toggleKerangka = () => setOpenKerangka((prev) => !prev);

  const handleLogout = () => {
    // Hapus data user dari localStorage
    localStorage.removeItem("user");
    // Redirect ke halaman login
    navigate("/", { replace: true });
    if (onClose) {
      onClose();
    }
  };

  const handleNavClick = () => {
    if (!onClose) {
      return;
    }

    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content-wrapper">
        {/* Header */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo Cerdas" className="sidebar-logo" />
          <div className="header-text">
            <h3>CERDAS</h3>
            <p>Cek Ringkasan Data Statistik</p>
          </div>
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            Close
          </button>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Menu utama */}
        <ul className="menu">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleNavClick}
            >
              <FaHome className="icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/kelola-pengguna"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUsers className="icon" />
              <span>Kelola Pengguna</span>
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/cover-halaman-utama"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleNavClick}
            >
              <FaFileAlt className="icon" />
              <span>Cover Halaman Utama</span>
            </NavLink>
          </li>

          {/* Dropdown Kerangka */}
          <li className={`dropdown ${openKerangka ? "open" : ""}`}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={toggleKerangka}
            >
              <span>Kerangka</span>
              {openKerangka ? (
                <FaChevronUp className="chevron" />
              ) : (
                <FaChevronDown className="chevron" />
              )}
            </button>

            {openKerangka && (
              <ul className="submenu">
                <li>
                  <NavLink
                    to="/kerangka/halaman-utama"
                    className={({ isActive }) =>
                      isActive ? "active-sub" : ""
                    }
                    onClick={handleNavClick}
                  >
                    Halaman Utama
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/kerangka/data-utama"
                    className={({ isActive }) =>
                      isActive ? "active-sub" : ""
                    }
                    onClick={handleNavClick}
                  >
                    Data Utama
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/kerangka/tema"
                    className={({ isActive }) =>
                      isActive ? "active-sub" : ""
                    }
                    onClick={handleNavClick}
                  >
                    Tema
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/kerangka/tabel"
                    className={({ isActive }) =>
                      isActive ? "active-sub" : ""
                    }
                    onClick={handleNavClick}
                  >
                    Tabel
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/kelola-data"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleNavClick}
            >
              <FaDatabase className="icon" />
              <span>Kelola Data</span>
            </NavLink>
          </li>

          {/* Tombol Logout */}
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          <img
            src={logoFooter}
            alt="Logo BPS"
            className="sidebar-footer-logo"
          />
          <p>BADAN PUSAT STATISTIK</p>
          <p>KOTA SUKABUMI</p>
        </div>
      </div>
    </div>
  );
}
