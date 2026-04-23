import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationModal from "../components/NotificationModal";
import { createNotification } from "../api/notificationApi";
import { GetUserById } from "../api/userApi";
import { IMAGE_BASE_URL } from "../utils/baseUrlConfig";
// import Loader from "../components/Loader";

export default function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  // ✅ FETCH USER API
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await GetUserById(id); // from userApi.js
      console.log("API Response:", res); // debug log
      if (!res.status == 1) {
        throw new Error(res.data.message || "Failed to fetch user");
      }

      setUser(res?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SEND NOTIFICATION
  const sendNotification = async (formData) => {
    try {
      await createNotification({
        ...formData,
        parent_id: id,
      });

      alert("Notification sent successfully");
      setShowModal(false);
    } catch (err) {
      alert("Failed to send notification");
    }
  };

  return (
    <div className="container py-3">
      {/* 🔥 LOADING */}
      {loading && (
        <div className="text-center py-5">
          {/* <Loader /> */}
          <p>Loading...</p>
        </div>
      )}

      {/* ❌ ERROR */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* ✅ MAIN CONTENT */}
      {!loading && user && (
        <>
          {/* 🔹 USER CARD */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <h5 className="mb-2">User Details</h5>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowModal(true)}
                >
                  🔔 Send Notification
                </button>
              </div>

              <div className="row g-3">
                {/* PROFILE */}
                <div className="col-md-3 text-center">
                  <img
                    src={
                      user.profile_image
                        ? `${IMAGE_BASE_URL}/${user.profile_image}`
                        : "https://t3.ftcdn.net/jpg/03/16/72/68/240_F_316726850_Kp5gHry52XIA0Cedl7b2K1remR1hJ8NU.jpg"
                    }
                    alt="profile"
                    className="rounded-circle mb-2"
                    width="120"
                    height="120"
                  />
                  <h6>{user.full_name}</h6>
                  <span className="badge bg-info text-dark">{user.role}</span>
                </div>

                {/* DETAILS */}
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {user.country_code}{" "}
                        {user.phone_number}
                      </p>
                      <p>
                        <strong>Created:</strong>{" "}
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="col-md-6">
                      <p>
                        <strong>Verified:</strong>{" "}
                        <span
                          className={`badge ${user.is_verified ? "bg-success" : "bg-warning"}`}
                        >
                          {user.is_verified ? "Yes" : "No"}
                        </span>
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${user.is_active ? "bg-success" : "bg-secondary"}`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </p>

                      <p>
                        <strong>Onboarding:</strong>{" "}
                        <span
                          className={`badge ${user.is_onboarding_complete ? "bg-success" : "bg-warning"}`}
                        >
                          {user.is_onboarding_complete ? "Complete" : "Pending"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🔹 CHILDREN SECTION */}
          <div className="card shadow-sm border-0">
            <div className="card-header">
              <strong>Children ({user.children.length})</strong>
            </div>

            <div className="card-body">
              {user.children.map((child) => (
                <div key={child.id} className="border rounded p-3 mb-3">
                  <div className="row align-items-center">
                    {/* 🔹 LEFT (Image + Name like parent) */}
                    <div className="col-md-3 text-center">
                      <img
                        src={
                          child.profile_image
                            ? `${IMAGE_BASE_URL}/${child.profile_image}`
                            : "https://via.placeholder.com/120"
                        }
                        alt="child"
                        className="rounded-circle mb-2"
                        width="110"
                        height="110"
                        style={{ objectFit: "cover" }}
                      />

                      <h6 className="mb-1">{child.full_name}</h6>

                      <small className="text-muted">
                        DOB: {child.date_of_birth}
                      </small>
                    </div>

                    {/* 🔹 RIGHT (Same layout as parent info) */}
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-md-4">
                          <p>
                            <strong>Gender:</strong>
                            <br />
                            {child.gender}
                          </p>
                        </div>

                        <div className="col-md-4">
                          <p>
                            <strong>Interest:</strong>
                            <br />
                            {child.interests}
                          </p>
                        </div>

                        <div className="col-md-4">
                          <p>
                            <strong>Communication:</strong>
                            <br />
                            {child.communication_level}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 🔔 MODAL */}
      <NotificationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={sendNotification}
      />
    </div>
  );
}
