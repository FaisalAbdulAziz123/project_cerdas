import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/InfografisView.css";

export default function InfografisView() {
  const navigate = useNavigate();
  const location = useLocation();

  const kelompokAktif = location.state?.kelompokNama || "INFOGRAFIS";

  const [dataGambar, setDataGambar] = useState([]);

  useEffect(() => {
    const fetchInfografis = async () => {
      try {
        const res = await fetch("http://localhost:5000/infografis");
        const data = await res.json();

        // Filter sesuai kelompok aktif
        const filtered = data.filter(
          (item) => item.kelompok === kelompokAktif
        );

        setDataGambar(filtered);
      } catch (error) {
        console.error("Error fetching infografis:", error);
      }
    };

    fetchInfografis();
  }, [kelompokAktif]);

  return (
    <div className="infografis-container">
      <div className="infografis-header">
        <h2 className="infografis-title">
          Data Infografis: {kelompokAktif.toUpperCase()}
        </h2>
        <button className="btn-kembali" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
      </div>

      {dataGambar.length === 0 ? (
        <div className="no-data-box">
          <p className="no-data">
            😔 Belum ada gambar untuk kelompok {kelompokAktif}.
          </p>
        </div>
      ) : (
        <div className="infografis-grid">
          {dataGambar.map((item) => (
            <div className="infografis-card" key={item.id}>
              <img
                src={item.gambar}
                alt="infografis"
                className="infografis-img"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
