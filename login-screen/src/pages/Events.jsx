import React, { useEffect, useState } from "react";
import CreateEventButton from "../components/CreateEventButton";
import { useNavigate } from "react-router-dom";

// Retrieve the user ID from localStorage
const userId = localStorage.getItem("userId");

const Events = () => {
  // State variables to manage events, user registrations, and filters
  const [allEvents, setAllEvents] = useState([]);
  const [myEventIds, setMyEventIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [onlyRegistered, setOnlyRegistered] = useState(false);

  // Load events and user registrations from localStorage when the component mounts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("allEvents") || "[]");
    const storedMyEventIds = JSON.parse(localStorage.getItem("myEventIds") || "[]");
    setAllEvents(storedEvents);
    setMyEventIds(storedMyEventIds);
  }, []);

  // Format a date-time string into a more readable format
  const formatDateTime = (dateTimeStr) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateTimeStr).toLocaleString("en-US", options);
  };

  // Handle event registration by adding the event ID to the user's registered events
  const handleRegister = (id) => {
    const updatedIds = [...myEventIds, id];
    setMyEventIds(updatedIds);
    localStorage.setItem("myEventIds", JSON.stringify(updatedIds));
  };

  // Handle event unregistration by removing the event ID from the user's registered events
  const handleUnregister = (id) => {
    const updatedIds = myEventIds.filter((eid) => eid !== id);
    setMyEventIds(updatedIds);
    localStorage.setItem("myEventIds", JSON.stringify(updatedIds));
  };

  // Filter and sort events based on search criteria and registration status
  const filteredEvents = allEvents
    .filter((event) => {
      const matchesSearch =
        searchType === "title"
          ? event.title.toLowerCase().includes(searchQuery.toLowerCase())
          : searchType === "group"
          ? event.group.toLowerCase().includes(searchQuery.toLowerCase())
          : event.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegistered = onlyRegistered ? myEventIds.includes(event.id) : true;

      return matchesSearch && matchesRegistered;
    })
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)); // Sort events by date and time

  const navigate = useNavigate();

  // Navigate to the edit event page for the selected event
  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

  // Handle event deletion by removing it from the list and updating localStorage
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    const updatedEvents = allEvents.filter((e) => e.id !== id);
    localStorage.setItem("allEvents", JSON.stringify(updatedEvents));
    setAllEvents(updatedEvents);

    const updatedMyEventIds = myEventIds.filter((eid) => eid !== id);
    localStorage.setItem("myEventIds", JSON.stringify(updatedMyEventIds));
    setMyEventIds(updatedMyEventIds);
  };

  return (
    <div className="events-container">
      {/* Header section with title and create event button */}
      <div className="events-header">
        <h2>All Events</h2>
        <CreateEventButton />
      </div>

      {/* Filters for searching and filtering events */}
      <div className="events-filters">
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="title">Title</option>
          <option value="group">Group</option>
          <option value="tag">Tag</option>
        </select>
        <input
          type="text"
          placeholder={`Search events by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={onlyRegistered}
            onChange={(e) => setOnlyRegistered(e.target.checked)}
          />
          Only Registered
        </label>
      </div>

      {/* Display events in a grid format */}
      <div className="events-grid-horizontal">
        {filteredEvents.length === 0 ? (
          <p>No events match your search or filters.</p>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{formatDateTime(event.dateTime)}</p>
              <p>{event.location}</p>
              <span>{event.tag}</span>
              <div>
                {myEventIds.includes(event.id) ? (
                  <button className="unregister" onClick={() => handleUnregister(event.id)}>
                    Unregister
                  </button>
                ) : (
                  <button className="register" onClick={() => handleRegister(event.id)}>
                    Register
                  </button>
                )}
              </div>
              {/* 3-dot menu for edit and delete options */}
              <div className="event-options">
                <button className="menu-button">⋮</button>
                <div className="dropdown-menu">
                  <button onClick={() => handleEdit(event.id)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
