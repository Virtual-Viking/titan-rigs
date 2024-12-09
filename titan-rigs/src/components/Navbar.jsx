import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import trackIcon from "/src/assets/dolly-flatbed.svg";
import cartIcon from "/src/assets/shopping-cart.svg";
import userIcon from "/src/assets/people.svg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <>
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="top-navbar-left">
          <span>Titan-Rigs : One stop solution for all computers Needs.</span>
        </div>
        <div className="top-navbar-right">
          <a href="/track-order" className="navbar-icon">
            <img src={trackIcon} alt="Track Order" />
            <span>Track Your Package</span>
          </a>
          <a href="/cart" className="navbar-icon">
            <img src={cartIcon} alt="Shopping Cart" />
            <span>Cart</span>
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
              title="My Account"
            />
            {isDropdownOpen && (
              <div className="navbar-dropdown-menu">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
