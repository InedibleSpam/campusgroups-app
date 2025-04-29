import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    tag: "",
    group: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: Date.now(),
      ...form
    };

    const existing = JSON.parse(localStorage.getItem("myEvents") || "[]");
    localStorage.setItem("myEvents", JSON.stringify([...existing, newEvent]));

    navigate("/my-events");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
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
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <select
          name="tag"
          value={form.tag}
          onChange={handleChange}
          required
        >
          <option value="">Select Tag</option>
          <option value="recreation">Recreation</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
        </select>

        <select
          name="group"
          value={form.group}
          onChange={handleChange}
        >
          <option value="">Connect to Group (optional)</option>
          <option value="group1">Group 1</option>
          <option value="group2">Group 2</option>
        </select>

        <button type="submit" style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Save Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
