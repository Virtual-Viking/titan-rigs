import Lottie from "lottie-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./searchbar.css";
import logo from "/src/assets/logo.svg";
import searchAnimation from "/src/assets/search.json";
import cartIcon from "/src/assets/shopping-cart.svg";

const Searchbar = () => {
  const { cart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "All Categories",
    "Processor",
    "Motherboard",
    "RAM",
    "SSD",
    "GPU",
    "Cooling Solutions",
    "Monitors",
    "Cabinet",
  ];

  const categoryMapping = {
    "All Categories": "",
    Processor: "processors",
    Motherboard: "motherboard",
    RAM: "ram",
    SSD: "ssd",
    GPU: "gpu",
    "Cooling Solutions": "aio",
    Monitors: "monitors",
    Cabinet: "cabinet",
  };

  const cartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        performSearch(searchQuery, selectedCategory);
      } else {
        setSearchResults([]); // Clear results
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory]);

  const performSearch = async (query, category) => {
    setIsLoading(true);
    setError("");
    try {
      const categoryParam = categoryMapping[category]
        ? `&category=${categoryMapping[category]}`
        : "";
      const response = await fetch(
        `/api/products?search=${query}${categoryParam}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.products || []);
      } else {
        setError("Unable to fetch search results. Please try again later.");
      }
    } catch (err) {
      console.error("Error performing search:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      {/* <div className="searchbar-search">
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
            placeholder={`Search in ${selectedCategory}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-icon-wrapper">
            <Lottie animationData={searchAnimation} className="search-icon" />
          </div>
        </div>
        {searchQuery.trim() !== "" && (
          <div className="search-results">
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="search-result-item"
                >
                  <img
                    src={product.image_url || "/default-image.jpg"}
                    alt={product.name}
                  />
                  <div className="search-result-details">
                    <h4>{product.name}</h4>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-results">No products found</div>
            )}
          </div>
        )}
      </div> */}
      <div className="searchbar-cart">
        <Link to="/add-to-cart" className="cart-icon-wrapper">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          {cartItems > 0 && <div className="cart-bubble">{cartItems}</div>}
        </Link>
        <span className="cart-total">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Searchbar;
