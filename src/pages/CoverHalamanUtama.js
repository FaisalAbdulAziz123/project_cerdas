import React, { useState, useEffect } from "react";
import axios from "axios";
// ✅ Pastikan folder styles ada di dalam src/
import "../styles/CoverHalamanUtama.css"; 

export default function CoverHalamanUtama() {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const BASE_URL = "https://tight-jillian-cerdas-da4a09ea.koyeb.app"; 

  useEffect(() => {
    getBackground();
  }, []);

  const getBackground = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/background`);
      if (response.data && response.data.gambar) {
        const imgPath = response.data.gambar.startsWith("data:") 
          ? response.data.gambar 
          : `${BASE_URL}/uploads/${response.data.gambar}`;
        setPreview(imgPath);
      }
    } catch (error) {
      console.error("Gagal mengambil background:", error);
    }
  };

  // ✅ FUNGSI KOMPRESI EKSTRA: Memaksa gambar menjadi kecil
  const resizeAndConvert = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        // Gunakan resolusi 1080p (maksimum)
        const MAX_WIDTH = 1080; 
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Kualitas diturunkan ke 0.5 (50%) agar file sangat ringan (pasti masuk database)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
        setBase64Image(dataUrl);
        setPreview(dataUrl);
      };
    };
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      resizeAndConvert(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!base64Image) {
      setMsg("❌ Pilih gambar baru terlebih dahulu!");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      // ✅ Kirim Base64 ke server online
      await axios.put(`${BASE_URL}/api/background`, {
        gambar: base64Image
      });
      setMsg("✅ Berhasil! Gambar tersimpan di database.");
    } catch (error) {
      console.error(error);
      // Jika masih gagal, berarti backend belum di-update limit-nya (Langkah 1)
      setMsg("❌ Gagal. Update 'limit: 50mb' di server.js backend kamu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cover-page">
      <div className="cover-header">
        <h2>Cover Halaman Utama</h2>
        <p>Kelola background aplikasi yang tersimpan aman di database cloud.</p>
      </div>

      <div className="cover-content">
        <div className="upload-card">
          <div className="image-preview-box">
            {preview ? (
              <img src={preview} alt="Preview" className="bg-preview" />
            ) : (
              <div className="placeholder-text">Belum ada gambar</div>
            )}
          </div>

          <form onSubmit={handleUpload} className="upload-form">
            <div className="file-input-wrapper">
              <label htmlFor="file-upload" className="custom-file-upload">Pilih Gambar</label>
              <input id="file-upload" type="file" accept="image/*" onChange={onFileChange} />
              <span className="file-name">{image ? image.name : "Tidak ada file"}</span>
            </div>

            {msg && <p className={`message ${msg.includes("✅") ? "success" : "error"}`}>{msg}</p>}

            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}