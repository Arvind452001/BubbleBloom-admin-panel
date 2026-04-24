import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ collapsed }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        width: collapsed ? "0px" : "240px",
        transition: "all 0.3s ease",
        minHeight: "100vh",
        background: "#005780",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        overflowX: "hidden",
      }}
    >
      {/* 🔹 Logo */}
      <div
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderBottom: "1px solid #0780b8",
        }}
      >
        <img
          src="/assets/images/logo.png"
          alt="logo"
          style={{
            width: collapsed ? "40px" : "140px",
            transition: "0.3s",
            height: "auto",
          }}
        />
      </div>

      {/* 🔹 Menu */}
      <ul style={{ listStyle: "none", padding: "10px", margin: 10 }}>
        {/* Dashboard */}
        <li>
          <Link
            to="/dashboard"
            style={{
              display: "flex",

              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/dashboard") ? "#0780b8" : "transparent",
            }}
          >
            <i className="fa fa-home" style={{ minWidth: "25px" }}></i>
            {!collapsed && <span>Dashboard</span>}
          </Link>
        </li>

        {/* Users */}
        <li>
          <Link
            to="/users"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/users") ? "#0780b8" : "transparent",
            }}
          >
            <i className="fa fa-users" style={{ minWidth: "25px" }}></i>
            {!collapsed && <span>Users</span>}
          </Link>
        </li>

        {/* Script Logs */}
        <li>
          <Link
            to="/script-logs"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/script-logs") ? "#0780b8" : "transparent",
            }}
          >
            <i className="fa fa-robot" style={{ minWidth: "25px" }}></i>
            {!collapsed && <span>Script List</span>}
          </Link>
        </li>
        {/* Script Logs */}
        <li>
          <Link
            to="/activities"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/activities") ? "#0780b8" : "transparent",
            }}
          >
            <i className="bi bi-activity" style={{ minWidth: "25px" }}></i>
            {!collapsed && <span>Activities</span>}
          </Link>
        </li>
        {/* FAQ */}
        <li>
          <Link
            to="/faq"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/faq") ? "#0780b8" : "transparent",
            }}
          >
            <i
              className="fa fa-question-circle"
              style={{ minWidth: "25px" }}
            ></i>
            {!collapsed && <span>FAQ</span>}
          </Link>
        </li>

        {/* Contact */}
        <li>
          <Link
            to="/contact"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/contact") ? "#0780b8" : "transparent",
            }}
          >
            <i className="fa fa-envelope" style={{ minWidth: "25px" }}></i>
            {!collapsed && <span>Contact</span>}
          </Link>
        </li>

        {/* Notifications */}
        <li>
          <Link
            to="/notifications"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              background: isActive("/notifications")
                ? "#0780b8"
                : "transparent",
            }}
          >
            <i className="fa fa-bell" style={{ minWidth: "25px" }}></i>
            {!collapsed && <span>Notifications</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
