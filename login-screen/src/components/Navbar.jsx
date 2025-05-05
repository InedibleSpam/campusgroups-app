import { Link } from "react-router-dom";

// Navbar component for navigation between pages
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="text-2xl">College CONNECT</div>
      <div className="links">
        <Link to="/homepage">Home</Link>
        <Link to="/mygroups">Groups</Link>
        <Link to="/events">Events</Link>
        <Link to="/calendar">Calendar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
