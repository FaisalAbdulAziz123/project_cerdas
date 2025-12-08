import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/Table.css";

export default function Tabel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { id_tema } = location.state || {};

  useEffect(() => {
    setIsLoading(true);
    if (id_tema) {
      axios
        .get(`http://localhost:5000/api/data_input/${id_tema}`)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("❌ Gagal ambil data:", err);
          setIsLoading(false);
        });
    } else {
      axios
        .get("http://localhost:5000/api/data_input")
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("❌ Gagal ambil semua data:", err);
          setIsLoading(false);
        });
    }
  }, [id_tema]);

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="tabel-container">
      {/* Header */}
      <div className="header-row">
        <div className="title-section">
          <div className="title-icon-large"></div>
          <div className="title-content">
            <h2 className="title">Data Input (Isi Tabel)</h2>
            <p className="subtitle">Semua data narasi, tema, kelompok, dan gambar</p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Memuat data...</div>
        </div>
      ) : data.length === 0 ? (
        /* Empty State */
        <div className="empty-state-container">
          <div className="empty-icon">📭</div>
          <h3 className="empty-title">Belum Ada Data</h3>
          <p className="empty-description">
            Tidak ada data yang tersedia saat ini. Silakan tambahkan data baru.
          </p>
        </div>
      ) : (
        /* Cards Grid */
        <div className="cards-grid">
          {data.map((item, index) => (
            <div key={item.id} className="data-card">
              {/* Card Header with Number */}
              <div className="card-header">
                <div className="card-number-circle">{index + 1}</div>
                <div className="card-header-info">
                  {/* Tags: Kelompok & Tema */}
                  <div className="card-tags">
                    {item.kelompok && (
                      <span className="card-tag tag-kelompok">
                        {item.kelompok}
                      </span>
                    )}
                    {item.tema && (
                      <span className="card-tag tag-tema">
                        {item.tema}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="card-image-wrapper">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.judulNarasi || "gambar"}
                    className="card-image"
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <div>🖼️</div>
                    <div className="no-image-text">Tidak Ada Gambar</div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="card-content">
                {/* Judul Narasi */}
                <h3 className="card-title">
                  {item.judulNarasi || "Tanpa Judul"}
                </h3>

                {/* Isi Narasi */}
                <div className="card-description">
                  {item.isiNarasi || "Tidak ada deskripsi tersedia"}
                </div>

                {/* Footer: Tanggal */}
                <div className="card-footer">
                  <div className="card-date">
                    <span className="date-icon">📅</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}