import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../src/styles/CoverHalamanUtama.css";

export default function CoverHalamanUtama() {
  const [image, setImage] = useState(null); // File yang akan diupload
  const [preview, setPreview] = useState(""); // URL preview gambar
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Ganti dengan URL Backend Anda
  const BASE_URL = "http://localhost:5000"; 

  // 1. Ambil Background Saat Ini ketika halaman dibuka
  useEffect(() => {
    getBackground();
  }, []);

  const getBackground = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/background`);
      // Jika ada gambar, set preview-nya
      if (response.data && response.data.gambar) {
        setPreview(`${BASE_URL}/uploads/${response.data.gambar}`);
      }
    } catch (error) {
      console.error("Gagal mengambil background:", error);
    }
  };

  // 2. Handle saat file dipilih
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Buat preview lokal sebelum upload
      setPreview(URL.createObjectURL(file));
    }
  };

  // 3. Handle Upload ke Server
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      setMsg("Pilih gambar terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    // 'gambar' harus sesuai dengan key di backend (multer)
    formData.append("gambar", image); 

    setLoading(true);
    try {
      // Endpoint ini harus menangani upload file (Multer) & Update DB
      await axios.put(`${BASE_URL}/api/background`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg("✅ Background berhasil diperbarui!");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMsg("❌ Gagal upload gambar.");
      setLoading(false);
    }
  };

  return (
    <div className="cover-page">
      <div className="cover-header">
        <h2>Cover Halaman Utama</h2>
        <p>Atur gambar background untuk tampilan awal aplikasi mobile.</p>
      </div>

      <div className="cover-content">
        <div className="upload-card">
          <h3>Preview Background Mobile</h3>
          
          <div className="image-preview-box">
            {preview ? (
              <img src={preview} alt="Background Mobile" className="bg-preview" />
            ) : (
              <div className="placeholder-text">Belum ada gambar</div>
            )}
          </div>

          <form onSubmit={handleUpload} className="upload-form">
            <div className="file-input-wrapper">
              <label htmlFor="file-upload" className="custom-file-upload">
                <i className="fas fa-cloud-upload-alt"></i> Pilih Gambar Baru
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={onFileChange} 
              />
              <span className="file-name">
                {image ? image.name : "Tidak ada file dipilih"}
              </span>
            </div>

            {msg && <p className="message">{msg}</p>}

            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>

        {/* Informasi Tambahan */}
        <div className="info-card">
          <h3>Ketentuan Gambar</h3>
          <ul>
            <li>Format: <strong>JPG, PNG</strong></li>
            <li>Orientasi: <strong>Landscape (Mendatar)</strong></li>
            <li>Ukuran Maksimal: <strong>5 MB</strong></li>
            <li>Disarankan resolusi tinggi agar tidak pecah di HP.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}