import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/loginScreen.css';

export default function Login() {
  
  //Create variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const userCredentials = { username: email, password };

    //Fetches credentials from backend
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

  //Create login form
  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleLogin}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="username@houghton.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        <div className="form-footer">
          <span>Forgot Password?</span>
          <button type="submit">Login</button>
          <span>
            New Here? <Link to="/Register">Create an Account</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
