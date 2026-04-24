import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex" }}>

      {/* ✅ Sidebar gets state */}
      <Sidebar collapsed={collapsed} />

      {/* ✅ Content shifts based on sidebar */}
      <div
        style={{
          marginLeft: collapsed ? "0px" : "240px", // 🔥 IMPORTANT
          transition: "0.3s ease",
          width: "100%",
        }}
      >
        {/* ✅ Pass toggle function */}
        <Header
          title="Admin Panel"
          toggleSidebar={() => setCollapsed(!collapsed)}
        />

        <main style={{ padding: "15px" }}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}