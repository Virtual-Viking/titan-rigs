import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import LoginModal from "./LoginPage"; // Ensure this points to the correct Login Modal component
import userIcon from "../assets/people.svg";
import cartIcon from "../assets/shopping-cart.svg";
import trackIcon from "../assets/dolly-flatbed.svg";
import wishlistIcon from "../assets/wishlist.svg"; // Wishlist icon

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for login/signup popup
  const dropdownRef = useRef(null);

  useEffect(() => {
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
    setIsDropdownOpen(false);
    window.location.reload(); // Refresh the page after logout
  };

  const isLoggedIn = Boolean(localStorage.getItem("token")); // Check if user is logged in

  return (
    <div className="top-navbar">
      <div className="navbar-content">
        {/* Left Section */}
        <div className="navbar-left">
          Titan-Rigs: One stop solution for all computer needs.
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          <a href="/track-order" className="navbar-icon">
            <img src={trackIcon} alt="Track Order" />
            Track Your Package
          </a>
          <div className="navbar-divider"></div>

          {/* Wishlist Icon: Visible only when logged in */}
          {isLoggedIn && (
            <>
              <a href="/wishlist" className="navbar-icon">
                <img src={wishlistIcon} alt="Wishlist" />
                Wishlist
              </a>
              <div className="navbar-divider"></div>
            </>
          )}

          <Link to="/add-to-cart" className="navbar-icon">
            <img src={cartIcon} alt="Cart" />
            Cart
          </Link>
          <div className="navbar-divider"></div>

          {/* User Icon */}
          <div
            className="navbar-user-dropdown"
            ref={dropdownRef}
            onClick={() => {
              if (isLoggedIn) {
                setIsDropdownOpen(!isDropdownOpen);
              } else {
                setIsLoginOpen(true); // Open login/signup modal for non-logged-in users
              }
            }}
          >
            <img src={userIcon} alt="User" />
            <span>{isLoggedIn ? "My Account" : "Login"}</span>
          </div>

          {/* Dropdown */}
          {isDropdownOpen && isLoggedIn && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login/Signup Modal */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default Navbar;
