import React, { useState, useEffect } from "react"; // Tambahkan useEffect
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import axios from "axios"; // Import Axios
import "../../styles/HalamanUtama.css";

// --- Komponen Modal (Pop-up) untuk Tambah/Edit Kelompok ---
// Komponen ini tidak berubah, karena fokusnya pada input Kelompok dan Keterangan
const Modal = ({ isOpen, onClose, itemData, onSave }) => {
  const [kelompok, setKelompok] = useState(itemData ? itemData.kelompok : "");
  const [keterangan, setKeterangan] = useState(itemData ? itemData.keterangan : "");
  
  const isNew = !itemData;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      // id hanya disertakan saat mode edit
      ...(itemData && { id: itemData.id }), 
      kelompok: kelompok.toUpperCase(),
      keterangan: keterangan,
    };
    
    // Panggil onSave yang sekarang akan memanggil API
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
  const [listData, setListData] = useState([]); // Awalnya kosong, diisi dari API
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const navigate = useNavigate();

  // 🎯 FUNGSI FETCH DATA DARI API
  const fetchDataKelompok = async () => {
    try {
      // Menggunakan endpoint API yang baru: /kelompok
      const res = await axios.get("http://localhost:5000/kelompok");
      
      // Mapping untuk menyesuaikan nama field dari backend ke frontend
      // Backend: nama_kelompok, Frontend: kelompok
      const formattedData = res.data.map(item => ({
        id: item.id,
        kelompok: item.nama_kelompok,
        keterangan: item.keterangan
      }));

      setListData(formattedData);
    } catch (err) {
      console.error("Gagal mengambil data kelompok dari backend:", err);
      // Tampilkan pesan error jika server tidak merespons
      alert("⚠️ Gagal terhubung ke server atau database. Cek console."); 
    }
  };

  // 🔄 Panggil saat komponen dimuat
  useEffect(() => {
    fetchDataKelompok();
  }, []);

// ------------------------------------
// 🎯 FUNGSI CRUD YANG MEMANGGIL API
// ------------------------------------

  const handleSave = async (dataToSave, isNew) => {
    try {
        if (isNew) {
            // POST data baru ke backend
            await axios.post("http://localhost:5000/kelompok", dataToSave);
            alert(`Kelompok ${dataToSave.kelompok} berhasil ditambahkan!`);
        } else {
            // PUT untuk update data
            await axios.put(`http://localhost:5000/kelompok/${dataToSave.id}`, dataToSave);
            alert("Kelompok berhasil diperbarui!");
        }
        
        // Refresh tabel setelah operasi CRUD berhasil
        fetchDataKelompok(); 

    } catch (error) {
        console.error("Gagal menyimpan data:", error);
        alert(`⚠️ Gagal menyimpan data ke server: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kelompok data ini?")) {
        try {
            // DELETE data ke backend
            await axios.delete(`http://localhost:5000/kelompok/${id}`);
            alert("Kelompok berhasil dihapus!");
            
            // Refresh tabel
            fetchDataKelompok(); 

        } catch (error) {
            console.error("Gagal menghapus data:", error);
            alert(`⚠️ Gagal menghapus data dari server: ${error.response?.data?.error || error.message}`);
        }
    }
  };
// ------------------------------------

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  
  const handleClick = (kelompok) => {
    if (kelompok === "INDIKATOR MAKRO") {
      // Kelompok 2: Indikator Makro (View berbeda)
      navigate("/kerangka/data-utama");
    } else if (kelompok === "SEKILAS KOTA SUKABUMI") {
      // Kelompok 3: Sekilas Kota Sukabumi (View berbeda)
      navigate("/sekilas-sukabumi-view");
    } else {
      // 🎯 Infografis dan SEMUA KELOMPOK BARU (View sama: Gambar)
      // Arahkan ke Infografis View, kirim nama kelompoknya sebagai state
      navigate("/infografis-view", { state: { kelompokNama: kelompok } });
    }
  };

  return (
    <div className="halaman-utama-container">
      <div className="halaman-utama-header">
        <h2 className="page-title">KERANGKA BERANDA UTAMA</h2>
        <div className="header-actions">
           {/* Tombol Tambah Kelompok Baru */}
          <button 
            className="btn-tambah" 
            onClick={() => handleOpenModal(null)}
          >
            <FaPlusCircle className="plus-icon" /> Tambah Kelompok
          </button>
          <div className="admin-profile">
            <FaExternalLinkAlt className="admin-icon" />
            <span>Admin</span>
          </div>
          <button className="btn-kembali" onClick={() => navigate(-1)}>
            Kembali
          </button>
        </div>
      </div>
      
      {/* --- Tabel Data --- */}
      <div className="table-wrapper">
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
            {listData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.kelompok}</td>
                <td>{item.keterangan}</td>
                <td className="aksi-cell">
                   {/* Tombol VIEW */}
                  <button 
                    className="btn-icon view-btn" 
                    onClick={() => handleClick(item.kelompok)}
                    title="Lihat Data"
                  >
                    <FaExternalLinkAlt className="external-link-icon" />
                  </button>
                  {/* Tombol EDIT */}
                  <button 
                    className="btn-icon edit-btn" 
                    onClick={() => handleOpenModal(item)}
                    title="Edit Kelompok"
                  >
                    <FaEdit className="edit-icon" />
                  </button>
                  {/* Tombol HAPUS */}
                  <button 
                    className="btn-icon delete-btn" 
                    onClick={() => handleDelete(item.id)}
                    title="Hapus Kelompok"
                  >
                    <FaTrashAlt className="trash-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Komponen Modal (Pop-up) --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemData={editingItem}
        onSave={handleSave}
      />
    </div>
  );
}