import { Link } from "react-router-dom";
import "../stylesheets/homepage.css";

export default function Homepage() {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to College CONNECT</h1>
                <p>Your hub for managing groups, events, and more!</p>
            </header>

            <nav className="homepage-nav">
                <ul>
                    <li><Link to="/events">View Events</Link></li>
                    <li><Link to="/calendar">Event Calendar</Link></li>
                    <li><Link to="/grouphomepage">Groups</Link></li>
                    <li><Link to="/create-group">Create a Group</Link></li>
                </ul>
            </nav>

            <div className="homepage-featured">
                <h2>Why Choose College CONNECT?</h2>
                <div className="featured-cards">
                    <div className="card">
                        <h3>Organize Your Groups</h3>
                        <p>Effortlessly manage your groups and stay connected with your peers.</p>
                    </div>
                    <div className="card">
                        <h3>Plan Events</h3>
                        <p>Create and join events to make the most of your college experience.</p>
                    </div>
                    <div className="card">
                        <h3>Stay on Schedule</h3>
                        <p>Use our calendar to keep track of all your important dates and activities.</p>
                    </div>
                </div>
            </div>

            <footer className="homepage-footer">
                <p>&copy; 2025 College CONNECT. All rights reserved.</p>
            </footer>
        </div>
    );
}