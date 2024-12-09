import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import trackIcon from "/src/assets/dolly-flatbed.svg";
import cartIcon from "/src/assets/shopping-cart.svg";
import userIcon from "/src/assets/people.svg";
import wishlistIcon from "/src/assets/wishlist.svg"; // Wishlist icon

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State for the login/signup popup
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
    <div className="top-navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <span>Titan-Rigs: One stop solution for all computer needs.</span>
        </div>
        <div className="navbar-right">
          <a href="/track-order" className="navbar-icon">
            <img src={trackIcon} alt="Track Order" />
            <span>Track Your Package</span>
          </a>
          {isLoggedIn && (
            <>
              <div className="navbar-divider"></div>
              <a href="/wishlist" className="navbar-icon">
                <img src={wishlistIcon} alt="Wishlist" />
                <span>Wishlist</span>
              </a>
            </>
          )}
          <div className="navbar-divider"></div>
          <a href="/cart" className="navbar-icon">
            <img src={cartIcon} alt="Shopping Cart" />
            <span>Cart</span>
          </a>
          <div className="navbar-divider"></div>
          <div
            className="navbar-user-dropdown"
            ref={dropdownRef}
            onClick={() => (isLoggedIn ? setIsDropdownOpen(!isDropdownOpen) : setIsLoginOpen(true))}
          >
            <img
              src={userIcon}
              alt="User"
              className={`navbar-user-icon ${
                isLoggedIn ? "logged-in" : "logged-out"
              }`}
            />
            <span>{isLoggedIn ? "My Account" : "Login"}</span>
            {isDropdownOpen && isLoggedIn && (
              <div className="navbar-dropdown-menu">
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
