import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaHandHoldingHeart,
  FaGraduationCap,
  FaChartLine,
  FaDollarSign,
  FaCoins,
  FaSeedling,
  FaShoppingCart,
  FaIndustry,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

function DataUtama() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // 🔹 Daftar data indikator
  const data = [
    { id: 1, indikator: "Kependudukan", icon: FaUsers, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80" },
    { id: 2, indikator: "Ketenagakerjaan", icon: FaBriefcase, image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80" },
    { id: 3, indikator: "Kemiskinan", icon: FaHandHoldingHeart, image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80" },
    { id: 4, indikator: "Pendidikan", icon: FaGraduationCap, image: "https://i.pinimg.com/1200x/bf/76/53/bf765374f627a24b3608baad7b084afd.jpg" },
    { id: 5, indikator: "Perkembangan Manusia", icon: FaChartLine, image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
    { id: 6, indikator: "Produk Domestik Regional Bruto (PDRB)", icon: FaDollarSign, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" },
    { id: 7, indikator: "Keuangan", icon: FaCoins, image: "https://i.pinimg.com/736x/bc/1f/95/bc1f955d535c528411b39ef84b8f770d.jpg" },
    { id: 8, indikator: "Pertanian Perkebunan", icon: FaSeedling, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" },
    { id: 9, indikator: "Harga Inflasi Nilai Tukar Petani", icon: FaShoppingCart, image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80" },
    { id: 10, indikator: "Pertambangan", icon: FaIndustry, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" },
    { id: 11, indikator: "Upah Minimum Kabupaten (UMK)", icon: FaMoneyBillWave, image: "https://i.pinimg.com/736x/73/5e/64/735e6480f0e8e296c46504b819d7ab52.jpg" },
  ];

  // 🔹 Klik kartu → buka halaman Tema berdasarkan ID
  const handleCardClick = (id) => {
    navigate(`/kerangka/tema/${id}`);
  };

  // 🔹 Tombol kembali
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #f3e8ff 100%)",
        padding: "2rem",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                KERANGKA
              </h1>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: "#1f2937",
                }}
              >
                DATA UTAMA
              </h2>
            </div>

            <button
              onClick={handleBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "2rem",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)",
              }}
            >
              <FaArrowLeft />
              <span>Kembali</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {data.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  boxShadow:
                    hoveredCard === item.id
                      ? "0 12px 30px rgba(0, 0, 0, 0.15)"
                      : "0 4px 15px rgba(0, 0, 0, 0.08)",
                  overflow: "hidden",
                  border: "1px solid #f0f0f0",
                  transition: "all 0.3s",
                  transform:
                    hoveredCard === item.id ? "translateY(-8px)" : "translateY(0)",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(item.id)} // ⬅️ langsung ke Tema
              >
                {/* Card Header */}
                <div
                  style={{
                    padding: "2rem 1.5rem",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "150px",
                    color: "white",
                  }}
                >
                  <IconComponent style={{ fontSize: "2rem", color: "white" }} />
                  <div>#{String(item.id).padStart(2, "0")}</div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontWeight: "700",
                      fontSize: "1rem",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {item.indikator}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DataUtama;
