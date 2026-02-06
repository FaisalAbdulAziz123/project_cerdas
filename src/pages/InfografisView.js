import React, { useEffect, useState } from "react";
import axios from "axios"; // Gunakan axios agar konsisten
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/InfografisView.css";

export default function InfografisView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil nama kelompok dari state navigasi, default ke "INFOGRAFIS" jika kosong
  const kelompokAktif = location.state?.kelompokNama || "INFOGRAFIS";

  const [dataGambar, setDataGambar] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State untuk Modal Popup

  // URL Backend
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchInfografis();
  }, [kelompokAktif]);

  const fetchInfografis = async () => {
    try {
      // Ambil semua data
      const res = await axios.get(`${BASE_URL}/infografis`);
      
      // Filter data sesuai kelompok yang dipilih (jika perlu)
      // Jika ingin menampilkan SEMUA gambar di menu ini, hapus filter-nya.
      // Di sini saya asumsikan kita menampilkan semua yang ada di tabel infografis.
      const filtered = res.data; 
      
      // Kalo mau filter spesifik: 
      // const filtered = res.data.filter(item => item.kelompok === kelompokAktif);

      setDataGambar(filtered);
    } catch (error) {
      console.error("Error fetching infografis:", error);
    }
  };

  // Fungsi menutup modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="infografis-container">
      {/* --- HEADER --- */}
      <div className="infografis-header">
        <h2 className="infografis-title">
          Galeri Infografis
        </h2>
        <button className="btn-kembali" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
      </div>

      {/* --- KONTEN GRID --- */}
      {dataGambar.length === 0 ? (
        <div className="no-data-box">
          <p className="no-data">
            😔 Belum ada gambar infografis yang tersedia.
          </p>
        </div>
      ) : (
        <div className="infografis-grid">
          {dataGambar.map((item) => {
            // Cek apakah gambar base64 atau nama file
            const isBase64 = item.gambar.startsWith("data:");
            const imageUrl = isBase64 
                ? item.gambar 
                : `${BASE_URL}/uploads/${item.gambar}`;

            return (
              <div 
                className="infografis-card" 
                key={item.id}
                onClick={() => setSelectedImage(imageUrl)} // Klik untuk Zoom
              >
                <img
                  src={imageUrl}
                  alt={item.kelompok}
                  className="infografis-img"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Error+Img"; }}
                />
                <div className="card-info">
                    {item.kelompok || "Tanpa Judul"}
                </div>
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
            <img src={selectedImage} alt="Detail Fullscreen" className="modal-img" />
          </div>
        </div>
      )}
    </div>
  );
}