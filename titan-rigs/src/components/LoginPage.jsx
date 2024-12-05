import React, { useState } from 'react';
import './LoginPage.css';  // Import your styles

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // Toggle between login and signup forms

  const handleSwitchForm = () => {
    setIsSignUp(!isSignUp);  // Toggle between login and signup
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>{isSignUp ? 'Create Account' : 'Sign In to Website'}</h2>
        
        {isSignUp ? (
          <>
            <input type="text" placeholder="Name" className="form__input" />
            <input type="email" placeholder="Email" className="form__input" />
            <input type="password" placeholder="Password" className="form__input" />
            <button className="button submit">SIGN UP</button>
          </>
        ) : (
          <>
            <input type="email" placeholder="Email" className="form__input" />
            <input type="password" placeholder="Password" className="form__input" />
            <button className="button submit">SIGN IN</button>
          </>
        )}

        <button className="switch-btn" onClick={handleSwitchForm}>
          {isSignUp ? 'Already have an account? Sign In' : 'Create an Account'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
