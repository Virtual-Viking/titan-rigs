import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isSignUp ? '/api/register' : '/api/login';
      const payload = isSignUp
        ? { first_name: firstName, last_name: lastName, email, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();

      if (isSignUp) {
        alert('Registration successful! Please log in.');
        setIsSignUp(false);
      } else {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Unexpected error occurred');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>✖</button>
        <h2>{isSignUp ? 'Create Account' : 'Sign In to Website'}</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </>
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
        <button className="switch-btn" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Sign In' : 'Create an Account'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
