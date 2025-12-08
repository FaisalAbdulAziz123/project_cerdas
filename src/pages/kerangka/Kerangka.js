import React from "react";
// import "../../styles/CoverKerangka.css";

export default function Kerangka() {
  return (
    <div className="kerangka-page">
      {/* Header */}
      <div className="kerangka-header">
        <h2>Kerangka</h2>
        <p>Struktur dasar laporan dan susunan bab</p>
      </div>

      {/* Content */}
      <div className="kerangka-content">
        <div className="kerangka-section">
          <h3>Kerangka Laporan</h3>
          <ul>
            <li>Bab I – Pendahuluan</li>
            <li>Bab II – Tinjauan Pustaka</li>
            <li>Bab III – Metodologi</li>
            <li>Bab IV – Implementasi Sistem</li>
            <li>Bab V – Penutup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
