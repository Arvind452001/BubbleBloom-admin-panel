import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const audioChartRef = useRef(null);
  const predictionChartRef = useRef(null);
  const audioCanvasRef = useRef(null);
  const predictionCanvasRef = useRef(null);

  useEffect(() => {
    if (!audioCanvasRef.current || !predictionCanvasRef.current) return;

    if (audioChartRef.current) audioChartRef.current.destroy();
    if (predictionChartRef.current) predictionChartRef.current.destroy();

    const audioCtx = audioCanvasRef.current.getContext("2d");
    const predictionCtx = predictionCanvasRef.current.getContext("2d");

    // 📊 Audio Upload Trend
    audioChartRef.current = new Chart(audioCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Audio Uploads",
            data: [120, 190, 300, 250, 400, 500],
            borderWidth: 3,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    // 📊 AI Predictions
    predictionChartRef.current = new Chart(predictionCtx, {
      type: "bar",
      data: {
        labels: ["Hungry", "Sleepy", "Crying", "Pain", "Happy"],
        datasets: [
          {
            label: "Predictions",
            data: [120, 90, 150, 60, 80],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    return () => {
      if (audioChartRef.current) audioChartRef.current.destroy();
      if (predictionChartRef.current) predictionChartRef.current.destroy();
    };
  }, []);

  // 🔹 Dummy Data (replace later with API)
  const fetchRecords = async () => {
    setLoading(true);

    const dummy = [
      {
        id: 1,
        child: "Baby Aarav",
        prediction: "Hungry",
        confidence: "92%",
        date: "2026-04-20",
        status: "CORRECT",
      },
      {
        id: 2,
        child: "Baby Riya",
        prediction: "Sleepy",
        confidence: "85%",
        date: "2026-04-19",
        status: "PENDING",
      },
    ];

    setTimeout(() => {
      setRecords(dummy);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <section id="dashboard" className="mb-4">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card bg-primary">
              <div className="card-body">
                <p className="text-white">Total Users</p>
                <h4 className="text-white">1,024</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning">
              <div className="card-body">
                <p className="text-white">Total Children</p>
                <h4 className="text-white">780</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success">
              <div className="card-body">
                <p className="text-white">Audio Records</p>
                <h4 className="text-white">5,320</h4>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-info">
              <div className="card-body">
                <p className="text-white">AI Accuracy</p>
                <h4 className="text-white">87%</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="analytics" className="mb-4">
        <div className="row mt-4 g-4">
          <div className="col-md-7">
            <div className="card p-4">
              <h6 className="fw-semibold mb-3">Audio Upload Trend</h6>
              <canvas ref={audioCanvasRef}></canvas>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-4">
              <h6 className="fw-semibold mb-3">AI Predictions</h6>
              <canvas ref={predictionCanvasRef}></canvas>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h6>Recent Audio Records</h6>

            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Child</th>
                  <th>Prediction</th>
                  <th>Confidence</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : records.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No records found
                    </td>
                  </tr>
                ) : (
                  records.map((item) => (
                    <tr key={item.id}>
                      <td>{item.child}</td>
                      <td>{item.prediction}</td>
                      <td>{item.confidence}</td>
                      <td>{item.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "CORRECT"
                              ? "bg-success"
                              : item.status === "PENDING"
                              ? "bg-warning"
                              : "bg-primary"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}