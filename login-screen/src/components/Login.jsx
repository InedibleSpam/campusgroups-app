import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (!storedUser) {
      alert('No user found. Please register first.');
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem('loggedIn', true);
      navigate('/Homepage'); 
    } else {
      alert('Invalid email or password');
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <div>
          <input
            type="email"
            placeholder="username@houghton.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <span>Forgot Password?</span>
        </div>
        <button type="submit">Login</button>
        <div>
          <span>
            New Here? <Link to="/Register">Create an Account</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
