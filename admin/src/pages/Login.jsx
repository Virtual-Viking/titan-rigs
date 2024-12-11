import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginBg from "../assets/login_bg.svg"; // Ensure the file path is correct
import logoIcon from "../assets/icon.svg"; // Ensure the file path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Store JWT token in localStorage
      const { token } = response.data;
      localStorage.setItem("authToken", token);


      window.location.href = "/AdminDashboard"; // Adjust redirect as needed
    } catch (err) {
      // Set error message
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      {/* Background Image */}
      <img src={loginBg} alt="Background" className="BGimage" />

      <div className="login-box">
        {/* Logo Icon */}
        <img src={logoIcon} alt="Logo" className="login-icon" />

        <h2>Login to your account</h2>
        <form className="Login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail Address"
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
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>
          <a href="#">Forgot password?</a>
        </p>
      </div>
    </div>
  );
};

export default Login;