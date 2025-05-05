import { Link } from "react-router-dom";

export default function Homepage() {
    return <>
    <h1>Homepage</h1>
    <p><Link to = "/login">Login</Link></p>
    <p><Link to = "/my-events">Events</Link></p>
    </>
}