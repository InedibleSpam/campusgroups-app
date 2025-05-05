import React from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom

const CreateGroupButton = ({ onClick }) => {
    const navigate = useNavigate();
  return (
    <button
      className="create-group-button"
      onClick={() => navigate("/create-group")}
    >
      + Create Group
    </button>
  );
}

export default CreateGroupButton; // Exporting the CreateGroupButton component as the default export