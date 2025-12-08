import React, { useState } from "react";
import "../styles/Kerangka.css";

export default function Kerangka() {
  const [data, setData] = useState([
    { id: 1, kategori: "Paket Wisata Bandung", harga: "Rp 2.500.000", status: "Aktif" },
    { id: 2, kategori: "Paket Wisata Bali", harga: "Rp 4.200.000", status: "Aktif" },
    { id: 3, kategori: "Paket Wisata Lombok", harga: "Rp 3.800.000", status: "Nonaktif" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setData(data.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="kelola-page">
      <div className="kelola-header">
        <h2>Kelola Data</h2>
        <p>Manajemen data paket wisata</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.kategori}</td>
                  <td>{item.harga}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        item.status === "Aktif" ? "aktif" : "nonaktif"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => alert("Edit fitur belum tersedia")}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-msg">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
