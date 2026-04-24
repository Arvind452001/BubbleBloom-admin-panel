import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

import AdminLayout from "./adminLayout/AdminLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Children from "./pages/Children";
import ChildDetails from "./pages/ChildDetails";
import AudioRecords from "./pages/AudioRecords";
import Feedback from "./pages/Feedback";
import Analytics from "./pages/Analytics";
import Notifications from "./components/Notifications";
import Reports from "./pages/Reports";
import Admins from "./pages/Admins";
import Settings from "./pages/Settings";
import FaqPage from "./pages/FaqPage";
import ContactPage from "./pages/ContactPage";
import ScriptLogsList from "./pages/ScriptLogsList";
import ScriptLogDetails from "./pages/ScriptLogDetails";
import ActivityForm from "./pages/ActivityForm";
import ActivityList from "./pages/ActivityList";
import ActivityDetails from "./pages/ActivityDetails";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* 🔓 PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Users */}
            <Route path="/users" element={<Users />} />
            <Route path="/user-details/:id" element={<UserDetails />} />

            {/* 🔜 Future Routes (ready for next pages) */}
            <Route path="/children" element={<Children />} />
            <Route path="/children-details/:id" element={<ChildDetails />} />
            <Route path="/audio-records" element={<AudioRecords />} />
            <Route path="/script-logs" element={<ScriptLogsList />} />
            <Route path="/script-logs/:id" element={<ScriptLogDetails  />} />
             <Route path="/activities" element={<ActivityList />} />
  <Route path="/activities/create" element={<ActivityForm />} />
  <Route path="/activities/edit/:id" element={<ActivityForm />} />
  <Route path="/activities/:id" element={<ActivityDetails />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
