// src/pages/ScriptLogsList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllScriptLogs,
  getScriptLogsStats,
  deleteScriptLog,
} from "../api/scriptLogsApi";

const ScriptLogsList = () => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  console.log("Stats:", stats);
  const navigate = useNavigate();

  // 🔥 Fetch Logs
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await getAllScriptLogs({ page, limit: 10 });
      setLogs(res?.data?.data || res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await getScriptLogsStats();
      setStats(res?.data?.data || res || {});
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteScriptLog(id);

      // reload
      fetchLogs();
      fetchStats();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [page]);

  return (
    <div className="container mt-4">
      {/* 🔥 STATUS CARDS */}
      <div className="row mb-4">
        {/* Total Logs */}
        <div className="col-md-4">
          <div className="card text-white bg-primary shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-1">Total Logs</h6>
              <h3 className="fw-bold">{stats.total_logs || 0}</h3>
            </div>
          </div>
        </div>

        {/* Total Children */}
        <div className="col-md-4">
          <div className="card text-white bg-success shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-1">Total Children</h6>
              <h3 className="fw-bold">{stats.total_children_logged || 0}</h3>
            </div>
          </div>
        </div>

        {/* Total Parents */}
        <div className="col-md-4">
          <div className="card text-white bg-warning shadow-sm">
            <div className="card-body text-center">
              <h6 className="mb-1">Total Parents</h6>
              <h3 className="fw-bold">{stats.total_parents_using || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 TABLE */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Script Logs</h5>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Child</th>
                  <th>Script</th>
                  <th>Context</th>
                  <th>Emotion</th>
                  <th>Date</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="spinner-border text-primary" />
                    </td>
                  </tr>
                ) : logs?.length ? (
                  logs.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>
                        <strong>{item.child?.full_name}</strong>
                      </td>

                      <td>{item.script_text || "-"}</td>

                      <td>
                        <span className="badge bg-info text-dark">
                          {item.context}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            item.emotional_state === "happy"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {item.emotional_state}
                        </span>
                      </td>

                      <td>{new Date(item.created_at).toLocaleDateString()}</td>

                      <td className="text-center d-flex justify-content-center gap-2">
                        {/* VIEW */}
                        <button
                          onClick={() => navigate(`/script-logs/${item.id}`)}
                          className="btn btn-sm btn-primary"
                        >
                          View
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn btn-sm btn-danger"
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="fw-semibold">Page {page}</span>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScriptLogsList;
