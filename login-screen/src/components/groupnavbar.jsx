import React from 'react';
import { Link } from 'react-router-dom';

const GroupNavbar = () => {
    return (
      <nav className="flex items-center justify-between bg-blue-600 p-4 text-white shadow-md">
        <div className="text-2xl font-bold">GroupPage</div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/Groups" className="hover:underline">Groups</Link>
          <Link to="/Create" className="hover:underline">Create a Group</Link>
        </div>
      </nav>
    );
  };

export default GroupNavbar;