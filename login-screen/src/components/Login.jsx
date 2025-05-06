import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/loginScreen.css";

export default function Login() {
  //Create variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const userCredentials = { email, password };

    //Fetches credentials from backend
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          localStorage.setItem("loggedIn", "true");
          navigate("/homepage");
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError("Error occurred while logging in.");
        console.error("Login Error:", error);
      });
  }

  //Function for password reset
  function handleForgotPassword() {
    if (!email) {
      setError("Please enter your email first");
      return;
    }

    fetch("http://localhost:3000/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch(() => alert("Failed to send reset email"));
  }

  //Create login form
  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleLogin}>
        <h1>Sign in</h1>

        <input
          type="email"
          placeholder="Email"
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
          <span>
            <a href="#" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </span>
          <button type="submit">Login</button>
          <span>
            New Here? <Link to="/Register">Create an Account</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
