import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ChildDetails() {
  const { id } = useParams();

  const [child, setChild] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchChild();
    fetchRecords();
  }, []);

  // 🔥 Dummy Child
  const fetchChild = () => {
    const dummy = {
      _id: id,
      name: "Baby Aarav",
      age: "1.5 yrs",
      gender: "Male",
      parentName: "Amit Sharma",
      totalRecords: 20,
      isActive: true,
    };

    setChild(dummy);
  };

  // 🔥 Dummy Audio Records
  const fetchRecords = () => {
    const dummy = [
      {
        _id: "1",
        prediction: "Hungry",
        confidence: "92%",
        date: "2026-04-20",
        status: "CORRECT",
      },
      {
        _id: "2",
        prediction: "Sleepy",
        confidence: "85%",
        date: "2026-04-18",
        status: "PENDING",
      },
    ];

    setRecords(dummy);
  };

  return (
    <div className="p-3">

      {/* Child Info */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Child Details</h5>

          {child && (
            <div className="row">
              <div className="col-md-4">
                <p><strong>Name:</strong> {child.name}</p>
                <p><strong>Age:</strong> {child.age}</p>
              </div>

              <div className="col-md-4">
                <p><strong>Gender:</strong> {child.gender}</p>
                <p><strong>Parent:</strong> {child.parentName}</p>
              </div>

              <div className="col-md-4">
                <p><strong>Total Records:</strong> {child.totalRecords}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      child.isActive ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {child.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Records Table */}
      <div className="card">
        <div className="card-header">
          <strong>Audio Records</strong>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Prediction</th>
                <th>Confidence</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
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
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}