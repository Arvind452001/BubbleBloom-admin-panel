// src/pages/ActivityForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createActivity,
  updateActivity,
  getActivityById,
} from "../api/activityApi";

const ActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    short_description: "",
    description: "",
    category: "",
    age_min: "",
    age_max: "",
    stage_relevance: "",
    practice_points: "",
    is_active: true,
    image: null,
    scripts: [],
  });

  // 🔥 preload edit
  useEffect(() => {
    if (id) {
      (async () => {
        const res = await getActivityById(id);
        const d = res?.data?.data;

        setForm({
          title: d.title || "",
          short_description: d.short_description || "",
          description: d.description || "",
          category: d.category || "",
          age_min: d.age_min || "",
          age_max: d.age_max || "",
          stage_relevance: d.stage_relevance || "",
          practice_points: d.practice_points || "",
          is_active: d.is_active ?? true,
          image: null,
          scripts: d.scripts || [],
        });
      })();
    }
  }, [id]);

  // 🔥 input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔥 image
  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // 🔥 scripts
  const addScript = () => {
    setForm({
      ...form,
      scripts: [
        ...form.scripts,
        {
          text: "",
          script_type: "model",
          stage_level: "Stage 1",
          speaker_role: "parent",
        },
      ],
    });
  };

  const updateScript = (index, field, value) => {
    const updated = [...form.scripts];
    updated[index][field] = value;
    setForm({ ...form, scripts: updated });
  };

  const removeScript = (index) => {
    const updated = form.scripts.filter((_, i) => i !== index);
    setForm({ ...form, scripts: updated });
  };

  // 🔥 submit (MAIN FIX)
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("short_description", form.short_description);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("age_min", String(form.age_min || ""));
    formData.append("age_max", String(form.age_max || ""));
    formData.append("stage_relevance", form.stage_relevance);
    formData.append("practice_points", form.practice_points);
    formData.append("is_active", form.is_active ? "true" : "false");

    // image
    if (form.image) {
      formData.append("image", form.image);
    }

    // ✅ dynamic scripts
    const cleanedScripts = form.scripts.map((s, index) => ({
      text: s.text,
      script_type: s.script_type || "model",
      stage_level: s.stage_level || "Stage 1",
      speaker_role: s.speaker_role || "parent",
      sort_order: index + 1,
    }));

    if (cleanedScripts.length > 0) {
      formData.append("scripts", JSON.stringify(cleanedScripts));
    }

    if (id) {
      await updateActivity(id, formData);
      alert("Activity updated successfully!");
    } else {
      await createActivity(formData);
      alert("Activity created successfully!");
    }

    navigate("/activities");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="card p-3">

        <h4>{id ? "Edit" : "Create"} Activity</h4>

        <input className="form-control mb-2" name="title" placeholder="Title"
          value={form.title} onChange={handleChange} />

        <input className="form-control mb-2" name="short_description"
          placeholder="Short Description"
          value={form.short_description} onChange={handleChange} />

        <textarea className="form-control mb-2" name="description"
          placeholder="Description"
          value={form.description} onChange={handleChange} />

        <input className="form-control mb-2" name="category"
          placeholder="Category"
          value={form.category} onChange={handleChange} />

        <div className="row">
          <div className="col">
            <input className="form-control mb-2" name="age_min"
              placeholder="Min Age"
              value={form.age_min} onChange={handleChange} />
          </div>
          <div className="col">
            <input className="form-control mb-2" name="age_max"
              placeholder="Max Age"
              value={form.age_max} onChange={handleChange} />
          </div>
        </div>

        <input className="form-control mb-2" name="stage_relevance"
          placeholder="Stage"
          value={form.stage_relevance} onChange={handleChange} />

        <textarea className="form-control mb-2" name="practice_points"
          placeholder="Practice Points"
          value={form.practice_points} onChange={handleChange} />

        {/* image */}
        <input type="file" className="form-control mb-2" onChange={handleImage} />

        {/* active */}
        <div className="form-check mb-2">
          <input type="checkbox" className="form-check-input"
            name="is_active" checked={form.is_active}
            onChange={handleChange} />
          <label className="form-check-label">Active</label>
        </div>

        {/* scripts */}
        <h5>Scripts</h5>

        {form.scripts.map((s, i) => (
          <div key={i} className="border p-2 mb-2">
            <input
              className="form-control mb-1"
              placeholder="Text"
              value={s.text}
              onChange={(e) => updateScript(i, "text", e.target.value)}
            />

            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => removeScript(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-2"
          onClick={addScript}
        >
          + Add Script
        </button>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ActivityForm;