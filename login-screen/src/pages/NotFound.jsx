import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Whoops! Looks like you're lost.</h2>
      <p>Let's get you back <Link to="/homepage">home</Link>.</p>
    </div>
  );
}
