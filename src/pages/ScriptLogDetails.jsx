// src/pages/ScriptLogDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getScriptLogById } from "../api/scriptLogsApi";

const ScriptLogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getScriptLogById(id);
      setData(res?.data?.data || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  // 🔥 Dynamic renderer (remaining fields)
  const renderRemaining = (obj, skipKeys = []) => {
    return Object.entries(obj).map(([key, value]) => {
      if (skipKeys.includes(key)) return null;

      return (
        <div key={key} className="mb-2">
          <strong className="text-capitalize">
            {key.replaceAll("_", " ")}:
          </strong>{" "}
          {typeof value === "object" && value !== null ? (
            <div className="ms-3 border-start ps-3 mt-1">
              {renderRemaining(value)}
            </div>
          ) : (
            <span className="text-muted">
              {value || "-"}
            </span>
          )}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mt-4 text-center">
        <p>No Data Found</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">

        {/* Header */}
        <div className="card-header d-flex justify-content-between">
          <h5 className="mb-0">Script Log Details</h5>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        <div className="card-body">

          {/* ⭐ Important Fields (clean UI) */}
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>ID:</strong> <span className="text-muted">{data.id}</span></p>
              <p><strong>Parent:</strong> <span className="text-muted">{data.parent?.full_name}</span></p>
              <p><strong>Email:</strong> <span className="text-muted">{data.parent?.email}</span></p>
              <p><strong>Phone:</strong> <span className="text-muted">{data.parent?.phone_number}</span></p>
            </div>

            <div className="col-md-6">
              <p><strong>Child:</strong> <span className="text-muted">{data.child?.full_name}</span></p>
              <p><strong>Communication:</strong> <span className="text-muted">{data.child?.communication_level}</span></p>
              <p><strong>DOB:</strong> <span className="text-muted">{data.child?.date_of_birth}</span></p>
            </div>
          </div>

          {/* Script */}
          <div className="mb-3">
            <h6>Script</h6>
            <div className="border rounded p-3 bg-light">
              <p><strong>Original:</strong> <span className="text-muted">{data.script_text || "-"}</span></p>
              <p><strong>Normalized:</strong> <span className="text-muted">{data.normalized_script_text || "-"}</span></p>
            </div>
          </div>

          {/* AI Result */}
          <div className="mb-3">
            <h6>AI Result</h6>
            <div className="border rounded p-3">
              <p><strong>Meaning:</strong> <span className="text-muted">{data.ai_result?.interpreted_meaning}</span></p>
              <p><strong>Behavior:</strong> <span className="text-muted">{data.ai_result?.analysis?.behavior_type}</span></p>
              <p><strong>Confidence:</strong> 
                <span className="badge bg-primary ms-2">
                  {data.ai_result?.analysis?.confidence}
                </span>
              </p>
            </div>
          </div>

          <hr />

          {/* 🔥 ALL REMAINING DATA */}
          <h6 className="mb-3">Other Details</h6>
          {renderRemaining(data, [
            "id",
            "parent",
            "child",
            "script_text",
            "normalized_script_text",
            "ai_result"
          ])}

        </div>
      </div>
    </div>
  );
};

export default ScriptLogDetails;