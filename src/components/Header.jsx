'use client';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ title, toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header
      style={{
        height: "70px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* 🔹 LEFT (Toggle + Title) */}
      <div style={{ display: "flex", alignItems: "center" }}>

        <button
          onClick={toggleSidebar}   // ✅ FIXED
          className="btn btn-outline-secondary me-2"
          style={{
            padding: "4px 10px",
            fontSize: "18px",
          }}
        >
          ☰
        </button>

        <h5 className="mb-0">{title}</h5>
      </div>

      {/* 🔹 RIGHT (User Dropdown) */}
      <div className="dropdown">
        <button
          className="btn d-flex align-items-center dropdown-toggle"
          data-bs-toggle="dropdown"
          style={{
            border: "none",
            background: "transparent",
          }}
        >
       

          <img
            src="/assets/images/avatar.svg"
            alt="avatar"
            className="rounded-circle"
            width="35"
            height="35"
          />
        </button>

        <ul
          className="dropdown-menu dropdown-menu-end"
          style={{ minWidth: "140px" }}
        >
          <li>
            <button
              onClick={handleLogout}
              className="dropdown-item text-danger"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}