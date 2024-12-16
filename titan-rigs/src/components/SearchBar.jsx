import React, { useContext, useState, useEffect } from "react";
import "./searchbar.css";
import { Link } from "react-router-dom";
import cartIcon from "/src/assets/shopping-cart.svg"; // Cart icon
import logo from "/src/assets/logo.svg"; // Replace with your logo path
import Lottie from "lottie-react"; // Import Lottie for animation
import searchAnimation from "/src/assets/search.json"; // Animated search icon
import { CartContext } from "../context/CartContext"; // Import CartContext

const Searchbar = () => {
  const { cart } = useContext(CartContext); // Access the cart from the CartContext
  const [selectedCategory, setSelectedCategory] = useState("All Categories"); // Default category
  const categories = [
    "All Categories",
    "Electronics",
    "Fashion",
    "Home",
    "Books",
  ];

  // Calculate total number of items in the cart
  const cartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of the items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="searchbar-container">
      {/* Logo */}
      <div className="searchbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
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
        <Link to="/add-to-cart" className="cart-icon-wrapper">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <div className="cart-bubble">{cartItems}</div>
        </Link>
        <span className="cart-total">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Searchbar;
