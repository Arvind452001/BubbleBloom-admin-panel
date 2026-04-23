import React, { useEffect, useState } from "react";
import { getContactMessages } from "../api/faq.api";

const ContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH ================= //
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getContactMessages();
      setMessages(res.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ================= FORMAT DATE ================= //
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Contact Messages</h3>

      <div className="card">
        <div className="card-body">

          {loading ? (
            <p>Loading...</p>
          ) : messages.length === 0 ? (
            <p className="text-muted">No messages found</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((msg, index) => (
                    <tr key={msg.id}>
                      <td>{index + 1}</td>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td style={{ maxWidth: "300px" }}>
                        {msg.message}
                      </td>
                      <td>{formatDate(msg.created_at)}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ContactPage;