import { Navigate } from "react-router-dom";

// Komponen untuk melindungi route yang memerlukan autentikasi
const ProtectedRoute = ({ children }) => {
  // Cek apakah user sudah login (cek dari localStorage)
  const user = localStorage.getItem("user");

  // Jika belum login, redirect ke halaman login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Jika sudah login, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;
