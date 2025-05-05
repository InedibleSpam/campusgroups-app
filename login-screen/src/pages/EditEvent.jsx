import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams(); // Extract the event ID from the URL parameters
  const eventId = parseInt(id); // Convert the event ID to an integer
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const [form, setForm] = useState(null); // State to manage the event form data

  // Fetch the event data when the component mounts or the event ID changes
  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("allEvents") || "[]"); // Retrieve all events from local storage
    const existing = events.find((e) => e.id === parseInt(id)); // Find the event with the matching ID
    if (existing) {
      setForm(existing); // Populate the form state with the event data
    } else {
      navigate("/events"); // Redirect to the events page if the event doesn't exist
    }
  }, [id, navigate]);

  // Handle changes to form inputs and update the state
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Dynamically update the field based on input name
    }));
  };

  // Handle form submission to save the updated event
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const events = JSON.parse(localStorage.getItem("allEvents") || "[]"); // Retrieve all events from local storage
    const updated = events.map((ev) => (ev.id === form.id ? form : ev)); // Replace the updated event in the list
    localStorage.setItem("allEvents", JSON.stringify(updated)); // Save the updated events back to local storage
    navigate("/events"); // Navigate back to the events page
  };

  // Show a loading message while the event data is being fetched
  if (!form) return <div className="loading-message">Loading event...</div>;

  return (
    <div className="form-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for event title */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        {/* Textarea for event description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          required
        />
        {/* Input for event date and time */}
        <input
          type="datetime-local"
          name="dateTime"
          value={form.dateTime}
          onChange={handleChange}
          required
        />
        {/* Input for event location */}
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        {/* Dropdown for selecting a tag */}
        <select name="tag" value={form.tag} onChange={handleChange} required>
          <option value="">Select Tag</option>
          <option value="recreation">Recreation</option>
          <option value="academic">Academic</option>
          <option value="social">Social</option>
        </select>
        {/* Dropdown for connecting the event to a group */}
        <select name="group" value={form.group} onChange={handleChange}>
          <option value="">Connect to Group (optional)</option>
          <option value="group1">Group 1</option>
          <option value="group2">Group 2</option>
        </select>
        {/* Submit button to save the changes */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEvent;
