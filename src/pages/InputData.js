import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaChevronDown } from "react-icons/fa";
import "../styles/InputData.css";

export default function InputData() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ URL Backend Online Kamu
  const BASE_URL = "https://tight-jillian-cerdas-da4a09ea.koyeb.app";

  const { kelompok, indikator, judul } = location.state || {};

  const [form, setForm] = useState({
    gambar: null,
    judulNarasi: "",
    isiNarasi: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // CHANGE TEXT INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLE FILE UPLOAD → convert ke Base64
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, gambar: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const isGambarOnly =
    kelompok !== "SEKILAS KOTA SUKABUMI" &&
    ((!indikator || indikator === "-" || indikator === "") &&
    (!judul || judul === "-" || judul === ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let endpoint = "";
    let payload = {};

    // 1. INFOGRAFIS
    if (isGambarOnly) {
      endpoint = `${BASE_URL}/infografis`;
      payload = {
        kelompok,
        gambar: form.gambar,
      };
    }
    // 2. SEKILAS KOTA SUKABUMI
    else if (kelompok === "SEKILAS KOTA SUKABUMI") {
      endpoint = `${BASE_URL}/api/sekilas`;
      payload = {
        judulNarasi: form.judulNarasi,
        isiNarasi: form.isiNarasi,
        gambar: form.gambar,
      };
    }
    // 3. DATA MAKRO (data_input)
    else {
      endpoint = `${BASE_URL}/api/input-data`;
      payload = {
        kelompok,
        indikator,
        judul,
        gambar: form.gambar,
        judulNarasi: form.judulNarasi,
        isiNarasi: form.isiNarasi,
      };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Data berhasil disimpan ke server online!");
        navigate("/kelola-data");
      } else {
        const errorData = await res.json();
        alert(`❌ Gagal: ${errorData.message || "Terjadi kesalahan server."}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error koneksi! Pastikan backend Koyeb Anda sedang aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="kelola-container">
      <div className="header-row1">
        <h2 className="title">INPUT DATA</h2>
      </div>

      <div className="breadcrumb">
        <button className="btn-breadcrumb">{kelompok || "Tanpa Kelompok"}</button>

        {!isGambarOnly && kelompok !== "SEKILAS KOTA SUKABUMI" && (
          <>
            <button className="btn-breadcrumb">{indikator}</button>
            <input className="breadcrumb-input" value={judul} readOnly />
          </>
        )}

        <button className="btn-kembali" onClick={() => navigate(-1)}>
          Kembali
        </button>
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        
        {isGambarOnly && (
          <div className="form-group">
            <label>Upload Infografis</label>
            <input type="file" accept="image/*" onChange={handleFile} required />
          </div>
        )}

        {kelompok === "SEKILAS KOTA SUKABUMI" && !isGambarOnly && (
          <>
            <div className="form-group">
              <label>Judul Narasi</label>
              <input
                type="text"
                name="judulNarasi"
                value={form.judulNarasi}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Isi Narasi</label>
              <textarea
                name="isiNarasi"
                value={form.isiNarasi}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload Gambar (Opsional)</label>
              <input type="file" accept="image/*" onChange={handleFile} />
            </div>
          </>
        )}

        {!isGambarOnly && kelompok !== "SEKILAS KOTA SUKABUMI" && (
          <>
            <div className="form-group">
              <label>Gambar</label>
              <input type="file" accept="image/*" onChange={handleFile} />
            </div>
            <div className="form-group">
              <label>Judul Narasi</label>
              <input
                type="text"
                name="judulNarasi"
                value={form.judulNarasi}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Isi Narasi</label>
              <textarea
                name="isiNarasi"
                value={form.isiNarasi}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </>
        )}

        <button type="submit" className="btn-simpan" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : "Simpan ke Server"}
        </button>
      </form>
    </div>
  );
}