// src/components/Layout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Untuk menampilkan konten halaman
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import "../styles/Layout.css"; // CSS baru untuk layout

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      {/* Sidebar akan menerima prop untuk statusnya */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Konten utama halaman */}
      <main className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>

        
        {/* Di sini konten dari route Anda akan ditampilkan */}
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}