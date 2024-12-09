import React, { useState } from "react";
import "./searchbar.css";
import cartIcon from "/src/assets/shopping-cart.svg"; // Cart icon
import logo from "/src/assets/logo.svg"; // Replace with your logo path
import Lottie from "lottie-react"; // Import Lottie for animation
import searchAnimation from "/src/assets/search.json"; // Animated search icon

const Searchbar = () => {
  const [cartItems, setCartItems] = useState(0); // Number of items in cart
  const [totalPrice, setTotalPrice] = useState(0.0); // Total cart price
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // Default category
  const categories = ["All Categories", "Electronics", "Fashion", "Home", "Books"];

  return (
    <div className="searchbar-container">
      {/* Logo */}
      <div className="searchbar-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Search Bar */}
      <div className="searchbar-search">
        <div className="search-input-wrapper">
          <select
            className="search-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="search-input"
            placeholder={`Search for Products`}
          />
          <div className="search-icon-wrapper">
            <Lottie animationData={searchAnimation} className="search-icon" />
          </div>
        </div>
      </div>

      {/* Cart Icon */}
      <div className="searchbar-cart">
        <div className="cart-icon-wrapper">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <div className="cart-bubble">{cartItems}</div>
        </div>
        <span className="cart-total">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Searchbar;
