// src/pages/ActivityDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityById } from "../api/activityApi";

const ActivityDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getActivityById(id);
      setData(res?.data?.data);
    })();
  }, [id]);

  if (!data) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="card-body">

          <h4>{data.title}</h4>
          <p className="text-muted">{data.short_description}</p>

          <p><strong>Description:</strong> {data.description}</p>
          <p><strong>Category:</strong> {data.category}</p>
          <p><strong>Age:</strong> {data.age_min} - {data.age_max}</p>
          <p><strong>Stage:</strong> {data.stage_relevance}</p>

        </div>
      </div>

      {/* Scripts */}
      <div className="card">
        <div className="card-header">Scripts</div>
        <div className="card-body">

          {data.scripts?.map((s) => (
            <div key={s.id} className="border rounded p-2 mb-2">
              <p><strong>Text:</strong> {s.text}</p>
              <p className="text-muted">
                {s.script_type} | {s.stage_level}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;