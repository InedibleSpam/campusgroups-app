import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4 text-white shadow-md">
      <div className="text-2xl font-bold">EventPlanner</div>
      <div className="flex space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/groups" className="hover:underline">Groups</Link>
        <Link to="/my-events" className="hover:underline">My Events</Link>
        <Link to="/calendar" className="hover:underline">Calendar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
