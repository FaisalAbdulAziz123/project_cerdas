import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/Tema.css";

function Tema() {
  const navigate = useNavigate();
  const { id } = useParams(); // id_indikator
  const [dataTema, setDataTema] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", judul: "", keterangan: "" });
  const [editMode, setEditMode] = useState(false);

  // ✅ Definisikan Base URL agar rapi
  const API_BASE = "https://tight-jillian-cerdas-da4a09ea.koyeb.app/tema";

  const indikatorList = {
    1: "Kependudukan",
    2: "Ketenagakerjaan",
    3: "Kemiskinan",
    4: "Pendidikan",
    5: "Perkembangan Manusia",
    6: "Produk Domestik Regional Bruto (PDRB)",
    7: "Keuangan",
    8: "Pertanian Perkebunan",
    9: "Harga Inflasi Nilai Tukar Petani",
    10: "Pertambangan",
    11: "Upah Minimum Kabupaten (UMK)",
  };

  const indikator = indikatorList[id];

  useEffect(() => {
    fetchTema();
  }, [id]);

  const fetchTema = async () => {
    try {
      // ✅ Mengambil tema berdasarkan ID Indikator
      const res = await axios.get(`${API_BASE}/${id}`);
      setDataTema(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleRowClick = (row) => {
    navigate(`/kerangka/tabel/${row.id}`, {
      state: { 
        id_tema: row.id,
        judul: row.judul, 
        indikator 
      },
    });
  };

  const handleAddClick = () => {
    setFormData({ id: "", judul: "", keterangan: "" });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (row, e) => {
    e.stopPropagation();
    setFormData(row);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (temaId, e) => {
    e.stopPropagation();
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      try {
        // ✅ Perbaikan: Menggunakan temaId yang spesifik untuk dihapus
        await axios.delete(`${API_BASE}/${temaId}`);
        fetchTema();
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // ✅ Update data tema yang sudah ada
        await axios.put(`${API_BASE}/${formData.id}`, formData);
      } else {
        // ✅ Perbaikan: Penulisan URL menggunakan backtick (``)
        await axios.post(`${API_BASE}/${id}`, {
          id_indikator: id,
          judul: formData.judul,
          keterangan: formData.keterangan,
        });
      }
      setShowModal(false);
      fetchTema();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data ke server.");
    }
  };

  return (
    <div className="tema-container">
      <div className="tema-header">
        <div className="header-content">
          <h2 className="header-title">
            <span className="title-kerangka">KERANGKA</span>
            <br />
            <span className="title-tema">TEMA</span>{" "}
            {indikator && (
              <span className="title-indikator">{indikator.toUpperCase()}</span>
            )}
          </h2>
        </div>
        <div className="admin-box">
          <button className="btn-kembali" onClick={() => navigate(-1)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
            Kembali
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="action-bar">
          <div className="info-count">
            <span className="count-badge">{dataTema.length}</span>
            <span className="count-text">Total Tema</span>
          </div>
          <button className="btn-tambah" onClick={handleAddClick}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Tambah Data
          </button>
        </div>

        <div className="cards-grid">
          {dataTema.map((row, index) => (
            <div
              key={row.id}
              className="tema-card"
              onClick={() => handleRowClick(row)}
            >
              <div className="card-header">
                <div className="card-number">{index + 1}</div>
                <div className="card-actions">
                  <button
                    className="icon-btn edit-btn"
                    onClick={(e) => handleEdit(row, e)}
                    title="Edit"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                  </button>
                  <button
                    className="icon-btn delete-btn"
                    onClick={(e) => handleDelete(row.id, e)}
                    title="Hapus"
                  >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <h3 className="card-title">{row.judul}</h3>
                <p className="card-description">
                  {row.keterangan || "Tidak ada keterangan"}
                </p>
              </div>
              <div className="card-footer">
                <span className="view-link">
                  Lihat Detail
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {dataTema.length === 0 && (
          <div className="empty-state">
            <h3>Belum Ada Data</h3>
            <p>Silakan tambahkan data tema baru</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editMode ? "Edit Data" : "Tambah Data"}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Judul</label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Keterangan</label>
                <textarea
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  rows="4"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-simpan">Simpan</button>
                <button type="button" className="btn-batal" onClick={() => setShowModal(false)}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tema;