import { useEffect, useState } from "react";

export default function Feedback() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 Dummy Data
  const fetchData = () => {
    const dummy = [
      {
        _id: "1",
        user: "Amit Sharma",
        child: "Baby Aarav",
        type: "Wrong Prediction",
        message: "AI said hungry but baby was sleepy",
        prediction: "Hungry",
        actual: "Sleepy",
        rating: 2,
        status: "OPEN",
        date: "2026-04-20",
      },
      {
        _id: "2",
        user: "Neha Verma",
        child: "Baby Riya",
        type: "Suggestion",
        message: "Add more categories like discomfort",
        prediction: "-",
        actual: "-",
        rating: 4,
        status: "RESOLVED",
        date: "2026-04-19",
      },
    ];

    setData(dummy);
  };

  // 🔥 Filter
  const filteredData =
    filter === "all"
      ? data
      : data.filter((f) => f.status === filter);

  // 🔥 Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(start, start + itemsPerPage);

  // 🔥 Status toggle
  const toggleStatus = (id) => {
    const updated = data.map((item) =>
      item._id === id
        ? {
            ...item,
            status: item.status === "OPEN" ? "RESOLVED" : "OPEN",
          }
        : item
    );
    setData(updated);
  };

  return (
    <div className="p-3">

      {/* 🔹 Header */}
      <div className="card mb-3 p-3 d-flex flex-row justify-content-between">
        <strong>Feedback</strong>

        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="OPEN">Open</option>
          <option value="RESOLVED">Resolved</option>
        </select>
      </div>

      {/* 🔹 Table */}
      <div className="card">
        <div className="table-responsive">
          <table className="table table-bordered">

            <thead>
              <tr>
                <th>User</th>
                <th>Child</th>
                <th>Type</th>
                <th>Message</th>
                <th>Prediction</th>
                <th>Actual</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No feedback found
                  </td>
                </tr>
              ) : (
                currentItems.map((f) => (
                  <tr key={f._id}>
                    <td>{f.user}</td>
                    <td>{f.child}</td>
                    <td>{f.type}</td>
                    <td style={{ maxWidth: "200px" }}>{f.message}</td>
                    <td>{f.prediction}</td>
                    <td>{f.actual}</td>

                    <td>
                      {"⭐".repeat(f.rating)}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          f.status === "OPEN"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>

                    <td>{f.date}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => toggleStatus(f._id)}
                      >
                        {f.status === "OPEN" ? "Resolve" : "Reopen"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

        {/* 🔥 Pagination */}
        <div className="d-flex justify-content-between p-3">

          <button
            className="btn btn-sm btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <div>
            Page {currentPage} / {totalPages}
          </div>

          <button
            className="btn btn-sm btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}