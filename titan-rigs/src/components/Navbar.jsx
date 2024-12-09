import React, { useState, useEffect, useRef } from "react";
import LoginPage from "./LoginPage";
import "./Navbar.css";
import userIcon from "/src/assets/people.svg";
import wishlistIcon from "/src/assets/wishlist.svg";
import cartIcon from "/src/assets/shopping-cart.svg";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    // Handle clicks outside the dropdown to close it
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <a href="/" className="navbar-logo">
            <img
              src="/src/assets/logo.svg"
              alt="Titan Rigs Logo"
              className="logo-img"
            />
          </a>
        </div>
        <div className="navbar-center">
          <a href="/" className="navbar-link">
            Home
          </a>
          <a href="/about" className="navbar-link">
            About Us
          </a>
          <a href="/rig-builder" className="navbar-link">
            RIG Builder
          </a>
          <a href="/contact" className="navbar-link">
            Contact Us
          </a>
        </div>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <a href="/wishlist" className="navbar-icon">
                <img src={wishlistIcon} alt="Wishlist" />
              </a>
              <a href="/cart" className="navbar-icon">
                <img src={cartIcon} alt="Shopping Cart" />
              </a>
              <div
                className="navbar-user-dropdown"
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <img
                  src={userIcon}
                  alt="User"
                  className="navbar-user-icon"
                  title="User Account"
                />
                {isDropdownOpen && (
                  <div className="navbar-dropdown-menu">
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              className="navbar-login-btn"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      {isLoginOpen && <LoginPage onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Navbar;
