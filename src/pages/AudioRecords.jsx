import { useEffect, useState } from "react";

export default function AudioRecords() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchRecords();
  }, []);

  // 🔥 Dummy Data
  const fetchRecords = () => {
    const dummy = [
      {
        _id: "1",
        child: "Baby Aarav",
        user: "Amit Sharma",
        prediction: "Hungry",
        confidence: "92%",
        date: "2026-04-20",
        status: "CORRECT",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        _id: "2",
        child: "Baby Riya",
        user: "Neha Verma",
        prediction: "Sleepy",
        confidence: "85%",
        date: "2026-04-18",
        status: "PENDING",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
      {
        _id: "3",
        child: "Baby Aarav",
        user: "Amit Sharma",
        prediction: "Crying",
        confidence: "70%",
        date: "2026-04-15",
        status: "WRONG",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
    ];

    setRecords(dummy);
  };

  // 🔥 Filter
  const filteredData =
    filter === "all"
      ? records
      : records.filter((r) => r.status === filter);

  // 🔥 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-3">
      <div className="card">

        {/* Header */}
        <div className="card-header d-flex justify-content-between">
          <strong>Audio Records</strong>

          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="CORRECT">Correct</option>
            <option value="PENDING">Pending</option>
            <option value="WRONG">Wrong</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Child</th>
                <th>User</th>
                <th>Prediction</th>
                <th>Confidence</th>
                <th>Date</th>
                <th>Status</th>
                <th>Audio</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No records found
                  </td>
                </tr>
              ) : (
                currentItems.map((r) => (
                  <tr key={r._id}>
                    <td>{r.child}</td>
                    <td>{r.user}</td>
                    <td>{r.prediction}</td>
                    <td>{r.confidence}</td>
                    <td>{r.date}</td>

                    <td>
                      <span
                        className={`badge ${
                          r.status === "CORRECT"
                            ? "bg-success"
                            : r.status === "PENDING"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td>
                      <audio controls style={{ width: "150px" }}>
                        <source src={r.audioUrl} type="audio/mpeg" />
                      </audio>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

      </div>
    </div>
  );
}