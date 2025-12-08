import React, { useState, useEffect } from "react";
import "../styles/KelolaData.css";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Data Indikator Makro tetap di-hardcode karena ini adalah sub-kategori spesifik
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
  const [kelompokList, setKelompokList] = useState([]); // 🎯 State baru untuk menampung data Kelompok dari API
  const [indikator, setIndikator] = useState("");
  const [judulList, setJudulList] = useState([]);
  const [judul, setJudul] = useState("");
  const navigate = useNavigate();

  // Hapus const kelompokOptions = [...]

  const indikatorOptions = {
    "INDIKATOR MAKRO": indikatorDataMakro, 
  };

  // 1. 🌐 FUNGSI FETCH DATA KELOMPOK DARI BACKEND
  const fetchKelompokFromDB = async () => {
    try {
      const res = await axios.get("http://localhost:5000/kelompok");
      
      // Mapping untuk menyesuaikan nama field dari backend ke frontend
      // Backend: nama_kelompok, Frontend: kelompok
      const formattedData = res.data.map(item => ({
        id: item.id,
        nama: item.nama_kelompok, // Menggunakan nama_kelompok dari DB
        keterangan: item.keterangan
      }));
      
      setKelompokList(formattedData);
    } catch (err) {
      console.error("Gagal ambil data kelompok:", err);
      setKelompokList([]);
    }
  };

  // 🔄 useEffect untuk memanggil data Kelompok saat komponen dimuat
  useEffect(() => {
    fetchKelompokFromDB();
  }, []); // Hanya dijalankan sekali

  // 2. 🔹 Ambil data tema sesuai Indikator ID (Logika lama tetap)
  useEffect(() => {
    const fetchJudulFromDB = async () => {
      if (indikator) {
        try {
          // Memanggil endpoint tema dengan ID indikator
          const res = await axios.get(`http://localhost:5000/tema/${indikator}`);
          setJudulList(res.data);
        } catch (err) {
          console.error("Gagal ambil data tema:", err);
          setJudulList([]);
        }
      } else {
        setJudulList([]);
      }
    };
    fetchJudulFromDB();
  }, [indikator]);

  // 🔹 Navigasi ke halaman input
  const handleInput = () => {
    // Cari kelompok yang saat ini dipilih
    const selectedGroup = kelompokList.find(item => item.nama === kelompok);

    if (!selectedGroup) {
        alert("⚠️ Silakan pilih kelompok terlebih dahulu!");
        return;
    }

    // Untuk kelompok non-indikator makro, Indikator dan Judul diisi '-'
    if (selectedGroup.nama !== "INDIKATOR MAKRO") {
      navigate("/input-data", {
        state: { kelompok: selectedGroup.nama, indikator: "-", judul: "-" },
      });
      return;
    }

    // Untuk Indikator Makro, pastikan semua field terisi
    if (kelompok && indikator && judul) {
      navigate("/input-data", {
        state: { kelompok, indikator, judul },
      });
    } else {
      alert("⚠️ Silakan pilih semua field terlebih dahulu!");
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
          <label>Kelompok</label>
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
            {/* 3. MAPPING: Menggunakan data dari state kelompokList */}
            {kelompokList.map((item) => (
              <option key={item.id} value={item.nama}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Indikator */}
        {kelompok === "INDIKATOR MAKRO" && (
          <>
            <div className="form-group">
              <label>Indikator</label>
              <select
                value={indikator}
                onChange={(e) => {
                  setIndikator(e.target.value); // Menyimpan ID ("1", "2", dst.)
                  setJudul("");
                }}
              >
                <option value="">-- Pilih Indikator --</option>
                {/* Menggunakan data Indikator Makro yang di-hardcode */}
                {indikatorOptions["INDIKATOR MAKRO"].map((item) => (
                  <option key={item.id} value={item.id}> 
                    {item.nama} 
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Judul Konten</label>
              <select
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
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
          Input Data
        </button>
      </div>
    </div>
  );
}