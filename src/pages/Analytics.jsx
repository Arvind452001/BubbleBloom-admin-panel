import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Analytics() {
  const uploadChartRef = useRef(null);
  const predictionChartRef = useRef(null);

  const uploadCanvasRef = useRef(null);
  const predictionCanvasRef = useRef(null);

  useEffect(() => {
    if (!uploadCanvasRef.current || !predictionCanvasRef.current) return;

    if (uploadChartRef.current) uploadChartRef.current.destroy();
    if (predictionChartRef.current) predictionChartRef.current.destroy();

    const uploadCtx = uploadCanvasRef.current.getContext("2d");
    const predictionCtx = predictionCanvasRef.current.getContext("2d");

    // 📊 Upload Trend
    uploadChartRef.current = new Chart(uploadCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Audio Uploads",
            data: [120, 200, 300, 250, 400],
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

    // 📊 Prediction Distribution
    predictionChartRef.current = new Chart(predictionCtx, {
      type: "bar",
      data: {
        labels: ["Hungry", "Sleepy", "Crying", "Pain"],
        datasets: [
          {
            label: "Predictions",
            data: [120, 90, 150, 60],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
      },
    });

    return () => {
      if (uploadChartRef.current) uploadChartRef.current.destroy();
      if (predictionChartRef.current) predictionChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="p-3">

      {/* 🔹 Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white p-3">
            <p>Total Users</p>
            <h4>1,024</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white p-3">
            <p>Total Children</p>
            <h4>780</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white p-3">
            <p>Audio Records</p>
            <h4>5,320</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-white p-3">
            <p>AI Accuracy</p>
            <h4>87%</h4>
          </div>
        </div>
      </div>

      {/* 🔹 Charts */}
      <div className="row g-4">

        <div className="col-md-6">
          <div className="card p-3">
            <h6>Audio Upload Trend</h6>
            <canvas ref={uploadCanvasRef}></canvas>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h6>Prediction Distribution</h6>
            <canvas ref={predictionCanvasRef}></canvas>
          </div>
        </div>

      </div>

      {/* 🔹 Insights */}
      <div className="card mt-4 p-3">
        <h6>Insights</h6>

        <ul>
          <li>Low Confidence Predictions: 120</li>
          <li>Wrong Predictions: 230</li>
          <li>Most Common Need: Hungry (40%)</li>
        </ul>
      </div>

    </div>
  );
}