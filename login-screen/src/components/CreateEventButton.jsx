import React from "react";
import { useNavigate } from "react-router-dom";

// Button component to navigate to the "Create Event" page
const CreateEventButton = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  return (
    <button
      className="create-event-button"
      onClick={() => navigate("/create-event")}
    >
      + Create Event
    </button>
  );
};

export default CreateEventButton;
