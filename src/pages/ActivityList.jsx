// src/pages/ActivityList.jsx
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities, deleteActivity } from "../api/activityApi";
import Loader from "../components/Loader";

const ActivityList = () => {
  const [allData, setAllData] = useState([]); // 🔥 full data
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  // 🔥 Fetch once
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getActivities();
      setAllData(res?.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this activity?")) return;

    await deleteActivity(id);
alert("Activity deleted successfully!");
    // update local data instead of refetch
    setAllData((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 Pagination logic
  const total = allData.length;
  const totalPages = Math.ceil(total / limit);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return allData.slice(start, start + limit);
  }, [allData, page, limit]);

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Activities</h4>

        <div className="d-flex gap-2">
          {/* Per Page */}
          <select
            className="form-select form-select-sm"
            style={{ width: "100px" }}
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/activities/create")}
          >
            + Create
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Age</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <Loader />
                  </td>
                </tr>
              ) : paginatedData.length ? (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.age_min} - {item.age_max}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.is_active
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="text-center d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() =>
                          navigate(`/activities/${item.id}`)
                        }
                      >
                        View
                      </button>

                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          navigate(`/activities/edit/${item.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="card-footer d-flex justify-content-between align-items-center">

          <span className="text-muted">
            Showing {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, total)} of {total}
          </span>

          <div className="d-flex gap-2">

            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="px-2 align-self-center">
              Page {page} / {totalPages || 1}
            </span>

            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityList;