import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("myEvents") || "[]");
    const existing = events.find(e => e.id === parseInt(id));
    if (existing) {
      setForm(existing);
    } else {
      navigate("/my-events");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const events = JSON.parse(localStorage.getItem("myEvents") || "[]");
    const updated = events.map(ev => ev.id === form.id ? form : ev);
    localStorage.setItem("myEvents", JSON.stringify(updated));
    navigate("/my-events");
  };

  if (!form) return <div style={{ padding: "20px" }}>Loading event...</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={form.dateTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <select name="tag" value={form.tag} onChange={handleChange} required>
          <option value="">Select Tag</option>
          <option value="recreation">Recreation</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
        </select>
        <select name="group" value={form.group} onChange={handleChange}>
          <option value="">Connect to Group (optional)</option>
          <option value="group1">Group 1</option>
          <option value="group2">Group 2</option>
        </select>
        <button type="submit" style={{
          padding: "10px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
