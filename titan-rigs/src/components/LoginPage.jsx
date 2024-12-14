import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSwitchForm = () => {
    setIsSignUp(!isSignUp);
    setError(""); // Reset error on form switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const endpoint = isSignUp
        ? "http://localhost:5000/api/register"
        : "http://localhost:5000/api/login";

      const payload = isSignUp
        ? { first_name: firstName, last_name: lastName, email, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();

      if (isSignUp) {
        alert("Registration successful! Please log in.");
        setIsSignUp(false);
      } else {
        localStorage.setItem("token", data.token);
        window.location.reload();
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred");
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup-close"
          onClick={onClose}
          aria-label="Close login popup"
        >
          ✖
        </button>
        <div className="form-container">
          <h2>{isSignUp ? "Create Account" : "Sign in to Website"}</h2>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form__input"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form__input"
                  required
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form__input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form__input"
              required
            />
            <button className="button submit">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <button
            className="switch-btn"
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {isSignUp ? "Already have an account? Sign In" : "Create an Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


