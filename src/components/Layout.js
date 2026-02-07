// src/components/Layout.js
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"; // Untuk menampilkan konten halaman
import Sidebar from "./Sidebar";
import "../styles/Layout.css"; // CSS baru untuk layout

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengontrol sidebar

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
        return;
      }

      setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);
  const openSidebar = () => setIsSidebarOpen(true);

  return (
    <div className="app-layout">
      {/* Sidebar akan menerima prop untuk statusnya */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <button
        type="button"
        className="mobile-sidebar-toggle"
        onClick={openSidebar}
        aria-label="Buka menu"
      >
        Menu
      </button>

      <div
        className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
        aria-hidden={!isSidebarOpen}
      />

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