import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children, title }) {
  return (
    <div className="admin-app d-flex">
      <Sidebar />

      <div className="content w-100">
        <Header title="Admin Panel" />

        <main className="p-3">
          <Outlet /> {/* 🔥 YAHAN PAGE RENDER HOGA */}
        </main>

        <Footer />
      </div>
    </div>
  );
}