import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/userApi";
// import Loader from "../components/Loader"; // use your loader

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ API CALL
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllUsers(); // from userApi.js
      // console.log("API Response:", res); 
      if (!res.status == 1) {
        throw new Error("Failed to fetch users");
      }
      setUsers(res?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER (based on is_active)
  const filteredData =
    filter === "all"
      ? users
      : users.filter((u) => (filter === "active" ? u.is_active : !u.is_active));

  // ✅ PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfLast - itemsPerPage,
    indexOfLast,
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-3">
      <div className="card">
        {/* HEADER */}
        <div className="card-header d-flex justify-content-between">
          <strong>Users List</strong>

          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center p-3">
            {/* <Loader /> */}
            <p>Loading...</p>
          </div>
        )}

        {/* ERROR */}
        {error && <div className="alert alert-danger m-3">{error}</div>}

        {/* TABLE */}
        {!loading && !error && (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Verified</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((u) => (
                    <tr key={u.id}>
                      <td>{u.full_name}</td>

                      <td>
                        {u.country_code} {u.phone_number}
                      </td>

                      <td>{u.email}</td>

                      <td>{u.role}</td>

                      <td>
                        <span
                          className={`badge ${
                            u.is_verified ? "bg-success" : "bg-warning"
                          }`}
                        >
                          {u.is_verified ? "Yes" : "No"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            u.is_active ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {u.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>{new Date(u.created_at).toLocaleDateString()}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => navigate(`/user-details/${u.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center mt-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    currentPage === i + 1 ? "btn-primary" : "btn-light"
                  } mx-1`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
