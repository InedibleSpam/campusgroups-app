import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  // State to manage the form inputs
  const [form, setForm] = useState({
    title: "",
    description: "",
    dateTime: "",
    location: "",
    tag: "",
    group: "",
  });

  // State to store the list of groups fetched from local storage
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  // Fetch groups from local storage when the component mounts
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups); // Populate the groups state with saved groups
  }, []);

  // Handle changes to form inputs and update the state
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Dynamically update the field based on input name
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const userId = localStorage.getItem("userId"); // Get the current user's ID from local storage

    // Create a new event object with form data and additional metadata
    const newEvent = {
      ...form,
      id: Date.now(), // Generate a unique ID for the event
      creatorId: userId, // Associate the event with the current user
    };

    // Retrieve existing events from local storage, add the new event, and save back
    const allEvents = JSON.parse(localStorage.getItem("allEvents") || "[]");
    allEvents.push(newEvent);
    localStorage.setItem("allEvents", JSON.stringify(allEvents));

    // Update the list of event IDs created by the current user
    const myEventIds = JSON.parse(localStorage.getItem("myEventIds") || "[]");
    if (!myEventIds.includes(newEvent.id)) {
      const updatedIds = [...myEventIds, newEvent.id];
      localStorage.setItem("myEventIds", JSON.stringify(updatedIds));
    }

    // Navigate to the events page after saving the event
    navigate("/events");
  };

  return (
    <div className="form-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for event title */}
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        {/* Textarea for event description */}
        <textarea
          name="description"
          placeholder="Description"
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
          placeholder="Location"
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
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        {/* Submit button to save the event */}
        <button type="submit">Save Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
