// src/pages/Events.jsx
import React, { useEffect, useState } from "react";
import CreateEventButton from "../components/CreateEventButton";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem("userId");

const Events = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [myEventIds, setMyEventIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); // Options: title, group, tag
  const [onlyRegistered, setOnlyRegistered] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("allEvents") || "[]");
    const storedMyEventIds = JSON.parse(localStorage.getItem("myEventIds") || "[]");
    setAllEvents(storedEvents);
    setMyEventIds(storedMyEventIds);
  }, []);

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

  const handleRegister = (id) => {
    const updatedIds = [...myEventIds, id];
    setMyEventIds(updatedIds);
    localStorage.setItem("myEventIds", JSON.stringify(updatedIds));
  };

  const handleUnregister = (id) => {
    const updatedIds = myEventIds.filter((eid) => eid !== id);
    setMyEventIds(updatedIds);
    localStorage.setItem("myEventIds", JSON.stringify(updatedIds));
  };

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = searchType === "title"
      ? event.title.toLowerCase().includes(searchQuery.toLowerCase())
      : searchType === "group"
      ? event.group.toLowerCase().includes(searchQuery.toLowerCase())
      : event.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegistered = onlyRegistered ? myEventIds.includes(event.id) : true;

    return matchesSearch && matchesRegistered;
  });

  const registerBtnStyle = {
    fontSize: "0.85em",
    backgroundColor: "#e2e3ff",
    color: "#004085",
    border: "1px solid #b8daff",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer"
  };
  
  const registeredBtnStyle = {
    fontSize: "0.85em",
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer"
  };  

const EventCard = ({ event }) => {
  const isRegistered = myEventIds.includes(event.id);
  const isCreator = event.creatorId === userId;
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(prev => !prev);

  return (
    <div style={{
      position: "relative",
      minWidth: "220px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      marginRight: "12px",
      background: "#f9f9f9"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0, color: "black" }}>{event.title}</h3>
        {isCreator && (
          <div style={{ position: "relative" }}>
            <button 
              onClick={toggleMenu} 
              style={{ 
                background: "none", 
                border: "none", 
                cursor: "pointer", 
                color: "#555",
                fontSize: "1.2em" 
              }}
            >
              ⋮
            </button>
            {showMenu && (
              <div style={{
                position: "absolute",
                top: "24px",
                right: "0",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                zIndex: 1000
              }}>
                <button
                  onClick={() => handleEdit(event.id)}
                  style={{ 
                    display: "block", 
                    width: "100%", 
                    padding: "8px", 
                    border: "none", 
                    background: "none", 
                    cursor: "pointer", 
                    color: "#007bff",
                    textAlign: "left" 
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  style={{ 
                    display: "block", 
                    width: "100%", 
                    padding: "8px", 
                    border: "none", 
                    background: "none", 
                    cursor: "pointer", 
                    color: "red", 
                    textAlign: "left" 
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p style={{ margin: 0, fontSize: "0.9em", color: "#333" }}>{formatDateTime(event.dateTime)}</p>
      <p style={{ fontSize: "0.85em", margin: "6px 0", color: "#444" }}>{event.location}</p>
      <span style={{
        fontSize: "0.75em",
        backgroundColor: "#007bff",
        color: "white", 
        padding: "2px 6px",
        borderRadius: "6px"
      }}>
        {event.tag}
      </span>

      <div style={{ marginTop: "8px" }}>
        {isRegistered ? (
          <button onClick={() => handleUnregister(event.id)} style={registeredBtnStyle}>
            Registered (Click to Unregister)
          </button>
        ) : (
          <button onClick={() => handleRegister(event.id)} style={registerBtnStyle}>
            Register
          </button>
        )}
      </div>
    </div>
  );
};


const navigate = useNavigate();

const handleEdit = (id) => {
    console.log(`Navigating to: /edit-event/${id}`);
    navigate(`/edit-event/${id}`);
};

const handleDelete = (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this event?");
  if (!confirmed) return;

  const updatedEvents = allEvents.filter(e => e.id !== id);
  localStorage.setItem("allEvents", JSON.stringify(updatedEvents));
  setAllEvents(updatedEvents);

  // Also unregister everyone from the event
  const updatedMyEventIds = myEventIds.filter(eid => eid !== id);
  localStorage.setItem("myEventIds", JSON.stringify(updatedMyEventIds));
  setMyEventIds(updatedMyEventIds);
};

  return (
    <div style={{ padding: "20px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px"
      }}>
        <h2 style={{ margin: 0 }}>All Events</h2>
        <CreateEventButton />
      </div>

      {/* Search and Filter Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        >
          <option value="title">Title</option>
          <option value="group">Group</option>
          <option value="tag">Tag</option>
        </select>
        <input
          type="text"
          placeholder={`Search events by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "50%",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={onlyRegistered}
            onChange={(e) => setOnlyRegistered(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Only Registered
        </label>
      </div>

      <div style={{
        display: "flex",
        overflowX: "auto",
        paddingBottom: "10px"
      }}>
        {filteredEvents.length === 0 ? (
          <p>No events match your search or filters.</p>
        ) : (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
