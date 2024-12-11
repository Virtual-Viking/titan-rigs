import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import loginBg from "../assets/login_bg.svg";
import logoIcon from "../assets/icon.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          const response = await axios.post(
            "http://localhost:5000/api/login",
            { email, password },
            { withCredentials: true }
          );
          console.log("Login successful:", response.data);
          alert("Login Successful!");
        } catch (err) {
          setError("Invalid email or password.");
        }
      };

    return (
        <div className="login-container">
            <img src={loginBg} alt="background" className="BGimage" />
            <div className="login-box">
            <img src={logoIcon} alt="Logo" className="login-icon" />
                <h2 style={{ color: "black"}} >ADMIN</h2>
                <form className="Login-form" onSubmit={handleSubmit}>
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
                    <button type="submit" >Login</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p>
          {/* <a href="#">Forgot password?</a> */}
        </p>
            </div>
        </div>
    );
};

export default Login;
