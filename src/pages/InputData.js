import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaChevronDown } from "react-icons/fa";
import "../styles/InputData.css";

export default function InputData() {
  const navigate = useNavigate();
  const location = useLocation();

  const { kelompok, indikator, judul } = location.state || {};

  const [form, setForm] = useState({
    gambar: null,
    judulNarasi: "",
    isiNarasi: "",
  });

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

  // ========================================================
  // FIX: DETEKSI INFOGRAFIS
  // Tidak punya indikator & judul = hanya gambar
  // ========================================================
  const isGambarOnly =
    kelompok !== "SEKILAS KOTA SUKABUMI" &&
    ((!indikator || indikator === "-" || indikator === "") &&
    (!judul || judul === "-" || judul === ""));

  console.log("DEBUG STATE:", { kelompok, indikator, judul, isGambarOnly });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let endpoint = "";
    let payload = {};

    // =================================================
    // 1. INFOGRAFIS (Hanya upload gambar)
    // =================================================
    if (isGambarOnly) {
      endpoint = "http://localhost:5000/infografis";
      payload = {
        kelompok,
        gambar: form.gambar,
      };
    }

    // =================================================
    // 2. SEKILAS KOTA SUKABUMI
    // =================================================
    else if (kelompok === "SEKILAS KOTA SUKABUMI") {
      endpoint = "http://localhost:5000/api/sekilas";
      payload = {
        judulNarasi: form.judulNarasi,
        isiNarasi: form.isiNarasi,
        gambar: form.gambar,
      };
    }

    // =================================================
    // 3. DATA MAKRO (data_input)
    // =================================================
    else {
      endpoint = "http://localhost:5000/api/input-data";
      payload = {
        kelompok,
        indikator,
        judul,
        gambar: form.gambar,
        judulNarasi: form.judulNarasi,
        isiNarasi: form.isiNarasi,
      };
    }

    console.log("KIRIM KE:", endpoint);
    console.log("PAYLOAD:", payload);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Data berhasil disimpan!");
        navigate("/kelola-data");
      } else {
        alert("❌ Gagal mengirim ke server.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error koneksi!");
    }
  };

  return (
    <div className="kelola-container">
      <div className="header-row1">
        <h2 className="title">INPUT DATA</h2>
       
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button className="btn-breadcrumb">{kelompok}</button>

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

      {/* FORM */}
      <form className="input-form" onSubmit={handleSubmit}>
        
        {/* ----------------------- */}
        {/* INFOGRAFIS: Gambar saja */}
        {/* ----------------------- */}
        {isGambarOnly && (
          <div className="form-group">
            <label>Upload Infografis</label>
            <input type="file" accept="image/*" onChange={handleFile} required />
          </div>
        )}

        {/* ----------------------- */}
        {/* SEKILAS */}
        {/* ----------------------- */}
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

        {/* ----------------------- */}
        {/* DATA MAKRO */}
        {/* ----------------------- */}
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

        <button type="submit" className="btn-simpan">
          Simpan
        </button>
      </form>
    </div>
  );
}
