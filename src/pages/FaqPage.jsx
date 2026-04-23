import React, { useEffect, useState } from "react";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../api/faq.api";

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    is_active: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // ================= FETCH ================= //
  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await getFaqs();
      setFaqs(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // ================= HANDLE CHANGE ================= //
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= SUBMIT ================= //
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateFaq(editingId, form);
        alert("FAQ updated successfully!");
      } else {
        await createFaq(form);
        alert("FAQ created successfully!");
      }

      setForm({ question: "", answer: "", is_active: true });
      setEditingId(null);
      setShowModal(false);
      fetchFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT ================= //
  const handleEdit = (faq) => {
    setForm({
      question: faq.question,
      answer: faq.answer,
      is_active: faq.is_active,
    });
    setEditingId(faq.id);
    setShowModal(true);
  };

  // ================= DELETE ================= //
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;

    try {
      await deleteFaq(id);
      alert("FAQ deleted successfully!");
      fetchFaqs();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= ADD NEW ================= //
  const handleAdd = () => {
    setForm({ question: "", answer: "", is_active: true });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <div className="container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>FAQ Management</h3>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add FAQ
        </button>
      </div>

      {/* ================= LIST ================= */}
      <div className="card">
        <div className="card-body">
          <h5>All FAQs</h5>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq) => (
                <div className="accordion-item" key={faq.id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq-${faq.id}`}
                    >
                      {faq.question}
                    </button>
                  </h2>

                  <div
                    id={`faq-${faq.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p>{faq.answer}</p>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleEdit(faq)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(faq.id)}
                        >
                          Delete
                        </button>

                        <span style={{paddingTop:"10px"}}
                          className={`badge ${
                            faq.is_active
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {faq.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
     {showModal && (
  <>
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg"> {/* 🔥 CHANGED HERE */}
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">
              {editingId ? "Update FAQ" : "Add FAQ"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>

          {/* BODY */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <input
                type="text"
                name="question"
                className="form-control mb-3"
                placeholder="Enter question"
                value={form.question}
                onChange={handleChange}
                required
              />

              <textarea
                name="answer"
                className="form-control mb-3"
                placeholder="Enter answer"
                rows={6} // 🔥 also increased height
                value={form.answer}
                onChange={handleChange}
                required
              />

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  Active
                </label>
              </div>
            </div>

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="btn btn-primary">
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>

    <div className="modal-backdrop fade show"></div>
  </>
)}
    </div>
  );
};

export default FaqPage;