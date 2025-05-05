import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/loginScreen.css'; 

export default function Register() {
  //Create variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  //Function for password confirmation
  function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const newUser = { username: email, password };

    //Stores credentials to backend
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          navigate('/Login');
        } else {
          setError(data.message || 'Registration failed.');
        }
      })
      .catch((err) => {
        setError('Error occurred while registering.');
        console.error('Register Error:', err);
      });
  }

  //Create registration form
  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleRegister}>
        <h1>Create Account</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <div className="error">{error}</div>}
        <div className="form-footer">
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/Login">Sign in</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
