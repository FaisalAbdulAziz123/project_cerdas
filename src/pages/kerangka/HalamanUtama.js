import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios";
import "../../styles/HalamanUtama.css";

// --- URL Backend Online ---
const API_BASE_URL = "https://tight-jillian-cerdas-da4a09ea.koyeb.app/kelompok";

// --- Komponen Modal (Pop-up) ---
const Modal = ({ isOpen, onClose, itemData, onSave }) => {
  const [kelompok, setKelompok] = useState("");
  const [keterangan, setKeterangan] = useState("");

  // Update state saat itemData berubah (untuk mode Edit)
  useEffect(() => {
    if (itemData) {
      setKelompok(itemData.kelompok);
      setKeterangan(itemData.keterangan);
    } else {
      setKelompok("");
      setKeterangan("");
    }
  }, [itemData, isOpen]);

  const isNew = !itemData;
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...(itemData && { id: itemData.id }), 
      kelompok: kelompok.toUpperCase(),
      keterangan: keterangan,
    };
    onSave(dataToSave, isNew);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{isNew ? "Tambah Kelompok Data Baru" : "Edit Kelompok Data"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Kelompok</label>
            <input
                type="text"
                value={kelompok}
                onChange={(e) => setKelompok(e.target.value)}
                required
                placeholder="Contoh: KELOMPOK BARU"
            />
          </div>
          <div className="form-group">
            <label>Keterangan</label>
            <input
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                required
                placeholder="Deskripsi singkat kelompok ini"
            />
          </div>
          <button type="submit" className="btn-save">
            {isNew ? "Simpan Kelompok Baru" : "Update Kelompok"}
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Batal
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Komponen Utama HalamanUtama ---
export default function HalamanUtama() {
  const [listData, setListData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  // 🎯 FUNGSI FETCH DATA (ONLINE)
  const fetchDataKelompok = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      const formattedData = res.data.map(item => ({
        id: item.id,
        kelompok: item.nama_kelompok,
        keterangan: item.keterangan
      }));
      setListData(formattedData);
    } catch (err) {
      console.error("Gagal mengambil data kelompok:", err);
      alert("⚠️ Gagal terhubung ke server online."); 
    }
  };

  useEffect(() => {
    fetchDataKelompok();
  }, []);

  // 🎯 FUNGSI SIMPAN/UPDATE (ONLINE)
  const handleSave = async (dataToSave, isNew) => {
    try {
        if (isNew) {
            await axios.post(API_BASE_URL, dataToSave);
            alert(`✅ Kelompok ${dataToSave.kelompok} berhasil ditambahkan!`);
        } else {
            await axios.put(`${API_BASE_URL}/${dataToSave.id}`, dataToSave);
            alert("✅ Kelompok berhasil diperbarui!");
        }
        fetchDataKelompok(); 
    } catch (error) {
        console.error("Gagal menyimpan data:", error);
        alert(`⚠️ Gagal menyimpan ke server: ${error.response?.data?.error || error.message}`);
    }
  };

  // 🎯 FUNGSI HAPUS (ONLINE)
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kelompok data ini?")) {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            alert("✅ Kelompok berhasil dihapus!");
            fetchDataKelompok(); 
        } catch (error) {
            console.error("Gagal menghapus data:", error);
            alert(`⚠️ Gagal menghapus: ${error.response?.data?.error || error.message}`);
        }
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  
  const handleClick = (kelompok) => {
    if (kelompok === "INDIKATOR MAKRO") {
      navigate("/kerangka/data-utama");
    } else if (kelompok === "SEKILAS KOTA SUKABUMI") {
      navigate("/sekilas-sukabumi-view");
    } else {
      navigate("/infografis-view", { state: { kelompokNama: kelompok } });
    }
  };

  return (
    <div className="halaman-utama-container">
      <div className="halaman-utama-header">
        <h2 className="page-title">KERANGKA BERANDA UTAMA</h2>
        <div className="header-actions">
          <button className="btn-tambah" onClick={() => handleOpenModal(null)}>
            <FaPlusCircle className="plus-icon" /> Tambah Kelompok
          </button>
          <button className="btn-kembali" onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>
      </div>
      
      <div className="table-wrapper">
        <div className="table-responsive">
          <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>KELOMPOK</th>
              <th>KETERANGAN</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {listData.length > 0 ? (
              listData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.kelompok}</td>
                  <td>{item.keterangan}</td>
                  <td className="aksi-cell">
                    <button className="btn-icon view-btn" onClick={() => handleClick(item.kelompok)} title="Lihat Data">
                      <FaExternalLinkAlt className="external-link-icon" />
                    </button>
                    <button className="btn-icon edit-btn" onClick={() => handleOpenModal(item)} title="Edit Kelompok">
                      <FaEdit className="edit-icon" />
                    </button>
                    <button className="btn-icon delete-btn" onClick={() => handleDelete(item.id)} title="Hapus Kelompok">
                      <FaTrashAlt className="trash-icon" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{textAlign: 'center'}}>Memuat data dari server...</td></tr>
            )}
          </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemData={editingItem}
        onSave={handleSave}
      />
    </div>
  );
}