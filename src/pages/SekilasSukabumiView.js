import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SekilasSukabumiView.css";

export default function SekilasSukabumiView() {
  const navigate = useNavigate();
  const [dataSekilas, setDataSekilas] = useState([]);

  useEffect(() => {
    const fetchSekilas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/sekilas");
        const data = await res.json();

        setDataSekilas(data);
      } catch (err) {
        console.error("Error fetching sekilas:", err);
      }
    };

    fetchSekilas();
  }, []);

  return (
    <div className="sekilas-container">
      <div className="sekilas-header">
        <h2>
          SEKILAS <span>KOTA SUKABUMI</span>
        </h2>
        <button className="btn-kembali" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>

      {dataSekilas.length === 0 ? (
        <p className="no-data">Belum ada data Sekilas Kota Sukabumi.</p>
      ) : (
        <div className="sekilas-list">
          {dataSekilas.map((item) => (
            <div key={item.id} className="sekilas-card">
              <h3>{item.judulNarasi}</h3>
              <p>{item.isiNarasi}</p>

              {item.gambar && (
                <img
                  src={item.gambar}
                  alt="sekilas"
                  className="sekilas-image"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
