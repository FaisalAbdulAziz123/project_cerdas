import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SekilasSukabumiView.css";

export default function SekilasSukabumiView() {
  const navigate = useNavigate();
  const [dataSekilas, setDataSekilas] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State untuk Modal

  // URL Backend
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchSekilas = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/sekilas`);
        const data = await res.json();
        setDataSekilas(data);
      } catch (err) {
        console.error("Error fetching sekilas:", err);
      }
    };

    fetchSekilas();
  }, []);

  // Fungsi tutup modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="sekilas-container">
      {/* Header */}
      <div className="sekilas-header">
        <h2>
          SEKILAS <span>KOTA SUKABUMI</span>
        </h2>
        <button className="btn-kembali" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
      </div>

      {/* Konten Grid */}
      {dataSekilas.length === 0 ? (
        <div className="no-data-box">
          <p className="no-data">Belum ada data Sekilas Kota Sukabumi.</p>
        </div>
      ) : (
        <div className="sekilas-grid">
          {dataSekilas.map((item) => {
            // Logika URL Gambar (Base64 vs Uploads)
            let imageUrl = null;
            if (item.gambar) {
              const isBase64 = item.gambar.startsWith("data:");
              imageUrl = isBase64 
                ? item.gambar 
                : `${BASE_URL}/uploads/${item.gambar}`;
            }

            return (
              <div key={item.id} className="sekilas-card">
                <h3>{item.judulNarasi}</h3>
                <p>{item.isiNarasi}</p>

                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="sekilas"
                    className="sekilas-image"
                    // Klik gambar untuk Zoom
                    onClick={() => setSelectedImage(imageUrl)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* --- MODAL POPUP (ZOOM GAMBAR) --- */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <img src={selectedImage} alt="Detail" className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
}