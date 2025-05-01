import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const userCredentials = { username: email, password };

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login successful') {
          localStorage.setItem('loggedIn', 'true');
          navigate('/Homepage');
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError('Error occurred while logging in.');
        console.error('Login Error:', error);
      });
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
