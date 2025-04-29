import React from "react";
import { useNavigate } from "react-router-dom";

const CreateEventButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create-event")}
      style={{
        padding: "8px 12px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      + Create Event
    </button>
  );
};

export default CreateEventButton;
