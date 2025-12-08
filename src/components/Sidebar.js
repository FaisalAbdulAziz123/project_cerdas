// src/components/Sidebar.js
import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaDatabase,
  FaChevronDown,
  FaChevronUp,
  FaFolderOpen,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../assets/kaca 1.png";
import logoFooter from "../assets/logo.png";
import "../styles/Sidebar.css";

export default function Sidebar({ isOpen }) {
  const [openKerangka, setOpenKerangka] = useState(false);

  const toggleKerangka = () => setOpenKerangka((prev) => !prev);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content-wrapper">
        {/* Header */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo Cerdas" className="sidebar-logo" />
          <div className="header-text">
            <h3>CERDAS</h3>
            <p>Cek Ringkasan Data Statistik Kota Sukabumi</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Menu utama */}
        <ul className="menu">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
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
            >
              <FaDatabase className="icon" />
              <span>Kelola Data</span>
            </NavLink>
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
