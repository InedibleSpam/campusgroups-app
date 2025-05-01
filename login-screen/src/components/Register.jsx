import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = { username: email, password };

    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          navigate('/login');
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError('Error occurred while registering.');
        console.error('Registration Error:', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        <div>
          <span>
            Already Have an Account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
