import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/InfografisView.css";

export default function InfografisView() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil nama kelompok dari state navigasi, default ke "INFOGRAFIS" jika kosong
  const kelompokAktif = location.state?.kelompokNama || "INFOGRAFIS";

  const [dataGambar, setDataGambar] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // ✅ URL Backend Online Kamu
  const BASE_URL = "https://tight-jillian-cerdas-da4a09ea.koyeb.app";

  useEffect(() => {
    fetchInfografis();
  }, [kelompokAktif]);

  const fetchInfografis = async () => {
    try {
      setIsLoading(true);
      // ✅ Ambil data dari server online
      const res = await axios.get(`${BASE_URL}/infografis`);
      
      // Filter data sesuai kelompok yang dipilih
      // Jika ingin filter berdasarkan kelompok aktif, gunakan baris di bawah ini:
      const filtered = res.data.filter(item => item.kelompok === kelompokAktif);
      
      setDataGambar(filtered);
    } catch (error) {
      console.error("Error fetching infografis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="infografis-container">
      {/* --- HEADER --- */}
      <div className="infografis-header">
        <h2 className="infografis-title">
          Galeri {kelompokAktif}
        </h2>
        <button className="btn-kembali" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
      </div>

      {/* --- KONTEN GRID --- */}
      {isLoading ? (
        <div className="no-data-box">
          <p>Memuat galeri dari server...</p>
        </div>
      ) : dataGambar.length === 0 ? (
        <div className="no-data-box">
          <p className="no-data">
            😔 Belum ada gambar untuk kelompok <strong>{kelompokAktif}</strong>.
          </p>
        </div>
      ) : (
        <div className="infografis-grid">
          {dataGambar.map((item) => {
            // Logika pengecekan URL Gambar
            const isBase64 = item.gambar && item.gambar.startsWith("data:");
            const isFullUrl = item.gambar && item.gambar.startsWith("http");
            
            let imageUrl = "";
            if (isBase64 || isFullUrl) {
              imageUrl = item.gambar;
            } else {
              // Jika hanya nama file, arahkan ke folder uploads di server Koyeb
              imageUrl = `${BASE_URL}/uploads/${item.gambar}`;
            }

            return (
              <div 
                className="infografis-card" 
                key={item.id}
                onClick={() => setSelectedImage(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt={item.kelompok}
                  className="infografis-img"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Gambar+Tidak+Ditemukan"; }}
                />
                <div className="card-info">
                    {item.judul || item.kelompok || "Tanpa Judul"}
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