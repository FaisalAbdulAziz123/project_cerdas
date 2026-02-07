import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../styles/Table.css";

export default function Tabel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const { id_tema } = location.state || {};

  // ✅ URL Backend Online
  const API_BASE_URL = "https://tight-jillian-cerdas-da4a09ea.koyeb.app";

  useEffect(() => {
    setIsLoading(true);
    
    const endpoint = id_tema 
      ? `${API_BASE_URL}/api/data_input/${id_tema}` 
      : `${API_BASE_URL}/api/data_input`;

    axios
      .get(endpoint)
      .then((res) => {
        // ✅ FIX LOGIC GAMBAR: Menangani Base64 dan File Upload
        const formattedData = res.data.map(item => {
          let finalUrl = item.gambar;

          if (item.gambar) {
            // 1. Jika sudah Base64 (dimulai dengan 'data:'), gunakan langsung
            if (item.gambar.startsWith('data:')) {
              finalUrl = item.gambar;
            } 
            // 2. Jika sudah URL lengkap (dimulai dengan 'http'), gunakan langsung
            else if (item.gambar.startsWith('http')) {
              finalUrl = item.gambar;
            }
            // 3. Jika hanya nama file (misal: 'gambar.jpg' atau '/uploads/gambar.jpg')
            else {
              // Bersihkan path agar tidak dobel /uploads/
              const cleanPath = item.gambar.replace('/uploads/', '');
              finalUrl = `${API_BASE_URL}/uploads/${cleanPath}`;
            }
          }

          return { ...item, gambar: finalUrl };
        });
        
        setData(formattedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Gagal ambil data:", err);
        setIsLoading(false);
      });
  }, [id_tema, API_BASE_URL]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="tabel-container">
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="image-modal-content">
            <span className="image-modal-close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Preview" className="image-modal-img" />
          </div>
        </div>
      )}

      <div className="header-row">
        <div className="title-section">
          <div className="title-icon-large"></div>
          <div className="title-content">
            <h2 className="title">Data Input (Isi Tabel)</h2>
            <p className="subtitle">Semua data narasi, tema, kelompok, dan gambar</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Memuat data dari server online...</div>
        </div>
      ) : data.length === 0 ? (
        <div className="empty-state-container">
          <div className="empty-icon">📭</div>
          <h3 className="empty-title">Belum Ada Data</h3>
          <p className="empty-description">Tidak ada data yang tersedia saat ini di server online.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {data.map((item, index) => (
            <div key={item.id} className="data-card">
              <div className="card-header">
                <div className="card-number-circle">{index + 1}</div>
                <div className="card-header-info">
                  <h2 className="card-main-title">Data Input</h2>
                </div>
              </div>

              <div className="card-tags-section">
                <div className="card-tags">
                  {item.kelompok && <span className="card-tag tag-kelompok">{item.kelompok}</span>}
                  {item.tema && <span className="card-tag tag-tema">{item.tema}</span>}
                </div>
              </div>

              <div className="card-date-section">
                <div className="card-date">
                  <span className="date-icon">📅</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>

              <div className="card-image-wrapper">
                {item.gambar ? (
                  <img
                    src={item.gambar}
                    alt={item.judulNarasi || "gambar"}
                    className="card-image"
                    onClick={() => handleImageClick(item.gambar)}
                    style={{ cursor: 'pointer' }}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/300?text=File+Gambar+Hilang";
                    }}
                  />
                ) : (
                  <div className="no-image-placeholder">
                    <div>🖼️</div>
                    <div className="no-image-text">Tidak Ada Gambar</div>
                  </div>
                )}
              </div>

              <div className="card-content">
                <h3 className="card-title">{item.judulNarasi || "Tanpa Judul"}</h3>
                <div className="card-description">{item.isiNarasi || "Tidak ada deskripsi tersedia"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}