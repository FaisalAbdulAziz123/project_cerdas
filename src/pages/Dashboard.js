  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { FaUser, FaChevronDown, FaHistory, FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
  import smartStats from "../assets/logo.png"; 
  import "../styles/Dashboard.css";

  export default function Dashboard() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
      fetchHistory();
    }, []);

    const fetchHistory = async () => {
      try {
        // Ensure the URL is correct
        const res = await axios.get("http://localhost:5000/api/history");
        console.log("Data History:", res.data); // Debugging: Check console F12
        setLogs(res.data);
      } catch (error) {
        console.error("Gagal mengambil history:", error);
      }
    };

    const getActionIcon = (action) => {
      if (action === "CREATE") return <FaPlusCircle className="icon-create" />;
      if (action === "DELETE") return <FaTrash className="icon-delete" />;
      if (action === "UPDATE") return <FaEdit className="icon-update" />;
      return <FaHistory className="icon-default" />;
    };

    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h2 className="dashboard-title">DASHBOARD</h2>
          <div className="admin-box">
            <FaUser className="admin-icon" />
            <span className="admin-text">Admin</span>
            <FaChevronDown className="admin-dropdown" />
          </div>
        </div>

        <div className="dashboard-content">
          
          {/* Left: Welcome Card */}
          <div className="dashboard-card">
            <img src={smartStats} alt="Statistik" className="dashboard-image" />
            <p className="dashboard-text">
              <span>Statistik Ringkas,</span>
              <br />
              <span>Solusi Cerdas</span>
            </p>
          </div>

          {/* Right: History Log */}
          <div className="history-section">
            <div className="history-header">
              <h3><FaHistory /> Aktivitas Terbaru</h3>
            </div>
            
            <div className="history-list">
              {logs.length === 0 ? (
                <div className="no-data">
                  <p>Belum ada aktivitas tercatat.</p>
                  <small>Cobalah menambah atau mengedit data.</small>
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="history-item">
                    <div className="history-icon">
                      {getActionIcon(log.action_type)}
                    </div>
                    <div className="history-details">
                      <span className="history-desc">{log.description}</span>
                      <span className="history-time">{formatDate(log.created_at)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }