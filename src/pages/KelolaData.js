import React, { useState, useEffect } from "react";
import "../styles/KelolaData.css";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Data Indikator Makro tetap di-hardcode karena ini adalah sub-kategori statis
const indikatorDataMakro = [
  { id: "1", nama: "KEPENDUDUKAN" },
  { id: "2", nama: "KETENAGAKERJAAN" },
  { id: "3", nama: "KEMISKINAN" },
  { id: "4", nama: "PENDIDIKAN" },
  { id: "5", nama: "PEMBANGUNAN_MANUSIA" },
  { id: "6", nama: "PRODUK_DOMESTIK_REGIONAL_BRUTO" },
  { id: "7", nama: "KEUANGAN" },
  { id: "8", nama: "PERTANIAN_PERKEBUNAN" },
  { id: "9",  nama: "HARGA_INFLASI_NILAI_TUKAR_PETANI" },
  { id: "10", nama: "PERTAMBANGAN" },
  { id: "11", nama: "UPAH_MINIMUM_KABUPATEN" },
];

export default function KelolaData() {
  const [kelompok, setKelompok] = useState("");
  const [kelompokList, setKelompokList] = useState([]); 
  const [indikator, setIndikator] = useState("");
  const [judulList, setJudulList] = useState([]);
  const [judul, setJudul] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Alamat Backend Online
  const BASE_URL = "https://tight-jillian-cerdas-da4a09ea.koyeb.app";

  const indikatorOptions = {
    "INDIKATOR MAKRO": indikatorDataMakro, 
  };

  // 1. 🌐 Ambil data Kelompok dari DB Online
  const fetchKelompokFromDB = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/kelompok`);
      const formattedData = res.data.map(item => ({
        id: item.id,
        nama: item.nama_kelompok,
        keterangan: item.keterangan
      }));
      setKelompokList(formattedData);
    } catch (err) {
      console.error("Gagal ambil data kelompok:", err);
      alert("⚠️ Gagal mengambil data kelompok dari server online.");
    }
  };

  useEffect(() => {
    fetchKelompokFromDB();
  }, []);

  // 2. 🔹 Ambil data tema sesuai Indikator yang dipilih
  useEffect(() => {
    const fetchJudulFromDB = async () => {
      if (indikator) {
        try {
          setIsLoading(true);
          const res = await axios.get(`${BASE_URL}/tema/${indikator}`);
          setJudulList(res.data);
        } catch (err) {
          console.error("Gagal ambil data tema:", err);
          setJudulList([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setJudulList([]);
      }
    };
    fetchJudulFromDB();
  }, [indikator]);

  const handleInput = () => {
    const selectedGroup = kelompokList.find(item => item.nama === kelompok);

    if (!selectedGroup) {
        alert("⚠️ Silakan pilih kelompok terlebih dahulu!");
        return;
    }

    // Untuk kelompok selain indikator makro (misal: SEKILAS KOTA)
    if (selectedGroup.nama !== "INDIKATOR MAKRO") {
      navigate("/input-data", {
        state: { kelompok: selectedGroup.nama, indikator: "-", judul: "-" },
      });
      return;
    }

    // Untuk Indikator Makro, pastikan semua field (Kelompok, Indikator, Judul) sudah dipilih
    if (kelompok && indikator && judul) {
      // Cari nama indikator berdasarkan ID untuk dikirim ke state
      const findIndikatorNama = indikatorDataMakro.find(i => i.id === indikator);
      
      navigate("/input-data", {
        state: { 
            kelompok, 
            indikator: findIndikatorNama ? findIndikatorNama.nama : indikator, 
            judul 
        },
      });
    } else {
      alert("⚠️ Silakan pilih Indikator dan Judul Konten terlebih dahulu!");
    }
  };

  return (
    <div className="kelola-container">
      <div className="header-row1">
        <h2 className="title">KELOLA DATA</h2>
      </div>

      <div className="kelola-form">
        {/* Kelompok */}
        <div className="form-group">
          <label>Kelompok Data</label>
          <select
            value={kelompok}
            onChange={(e) => {
              setKelompok(e.target.value);
              setIndikator("");
              setJudul("");
              setJudulList([]);
            }}
          >
            <option value="">-- Pilih Kelompok --</option>
            {kelompokList.map((item) => (
              <option key={item.id} value={item.nama}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Form tambahan muncul hanya jika memilih INDIKATOR MAKRO */}
        {kelompok === "INDIKATOR MAKRO" && (
          <>
            <div className="form-group">
              <label>Pilih Indikator</label>
              <select
                value={indikator}
                onChange={(e) => {
                  setIndikator(e.target.value);
                  setJudul("");
                }}
              >
                <option value="">-- Pilih Indikator --</option>
                {indikatorOptions["INDIKATOR MAKRO"].map((item) => (
                  <option key={item.id} value={item.id}> 
                    {item.nama} 
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Pilih Judul Konten {isLoading && "(Memuat...)"}</label>
              <select
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                disabled={isLoading}
              >
                <option value="">-- Pilih Judul Konten --</option>
                {judulList.map((item) => (
                  <option key={item.id} value={item.judul}>
                    {item.judul}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <button className="btn-input" onClick={handleInput}>
          Proses Input Data
        </button>
      </div>
    </div>
  );
}