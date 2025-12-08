

// import React, { useState } from "react";
// import "../styles/KelolaPengguna.css";
// import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

// export default function KelolaPengguna() {
//   const [users, setUsers] = useState([
//     { id: 1, name: "Admin Utama", username: "admin", password: "******", role: "Admin" },
//     { id: 2, name: "Petugas 1", username: "petugas1", password: "******", role: "Petugas" },
//     { id: 3, name: "Petugas 2", username: "petugas2", password: "******", role: "Petugas" },
//   ]);

//   return (
//     <div className="kelola-page">
//       {/* Header */}
//       <div className="kelola-header">
//         <h2>Kelola Pengguna</h2>
//         <div className="admin-box">
//           <span className="admin-icon">👤</span>
//           <span className="admin-text">Admin</span>
//         </div>
//       </div>

//       {/* Search + Buttons */}
//       <div className="action-bar">
//         <div className="search-box">
//           <FaSearch className="search-icon" />
//           <input type="text" placeholder="Cari pengguna..." />
//         </div>
//         <button className="btn btn-green">Tambah Pengguna</button>
//         <button className="btn btn-orange">Kembali</button>
//       </div>

//       {/* Table */}
//       <div className="table-container">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Nama</th>
//               <th>Username</th>
//               <th>Password</th>
//               <th>Role</th>
//               <th>Aksi</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user, index) => (
//                 <tr key={user.id}>
//                   <td>{index + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.username}</td>
//                   <td>{user.password}</td>
//                   <td>{user.role}</td>
//                   <td className="aksi-btns">
//                     <FaTrash
//                       className="icon-btn delete"
//                       onClick={() => handleDelete(user.id)}
//                     />
//                     <FaEdit
//                       className="icon-btn edit"
//                       onClick={() => alert("Edit fitur belum dibuat")}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="empty-msg">
//                   Tidak ada pengguna
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

