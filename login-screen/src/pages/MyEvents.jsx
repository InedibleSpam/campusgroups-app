import React, { useEffect, useState } from "react";
import CreateEventButton from "../components/CreateEventButton";
import { useNavigate } from "react-router-dom";

const mockAllEvents = [
  { id: 101, title: "Event 1", dateTime: "2025-05-03" },
  { id: 102, title: "Event 2", dateTime: "2025-05-07" },
  { id: 103, title: "Event 3", dateTime: "2025-05-12" },
]; // To be completed

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
  
  const EventCard = ({ event, onDelete, onEdit }) => (
    <div style={{
      minWidth: "200px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      marginRight: "12px",
      background: "#f9f9f9",
      position: "relative"
    }}>
      <h3 style={{ margin: "0 0 4px 0", color: "black" }}>{event.title}</h3>
      <p style={{ margin: 0, fontSize: "0.9em", color: "#555" }}>
        {formatDateTime(event.dateTime)}
      </p>
      <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
        <button onClick={() => onEdit(event.id)} style={{ fontSize: "0.8em" }}>Edit</button>
        <button onClick={() => onDelete(event.id)} style={{ fontSize: "0.8em", color: "red" }}>Delete</button>
      </div>
    </div>
  );  
  
  const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("myEvents") || "[]");
      setMyEvents(stored);
    }, []);
  
    const handleDelete = (id) => {
        const event = myEvents.find(e => e.id === id);
        const confirmed = window.confirm(`Are you sure you want to delete "${event.title}"?`);
      
        if (confirmed) {
          const updated = myEvents.filter(e => e.id !== id);
          localStorage.setItem("myEvents", JSON.stringify(updated));
          setMyEvents(updated);
        }
      };      
  
    const handleEdit = (id) => {
      navigate(`/edit-event/${id}`);
    };
  
    return (
      <div style={{ padding: "20px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px"
        }}>
          <h2 style={{ margin: 0 }}>My Events</h2>
          <CreateEventButton />
        </div>
  
        <div style={{
          display: "flex",
          overflowX: "auto",
          paddingBottom: "10px",
          marginBottom: "20px"
        }}>
          {myEvents.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            myEvents.map(event => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} onEdit={handleEdit} />
            ))
          )}
        </div>

      <h2 style={{ marginBottom: "10px" }}>All Events</h2>

      <div style={{
        display: "flex",
        overflowX: "auto",
        paddingBottom: "10px"
      }}>
        {mockAllEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default MyEvents;
