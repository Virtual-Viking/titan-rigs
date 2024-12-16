import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/productPage";
import CategoryPage from "./components/CategoryPage";
import RigBuilder from "./components/RigBuilder";
import AddToCartPage from "./components/AddToCartPage";
import { CartProvider } from "./context/CartContext";
import CheckoutPage from "./components/CheckoutPage";

const App = () => {
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    // Wrap the entire app with CartProvider to provide cart state globally
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <SearchBar onSearch={handleSearch} />
          <Slider onCategoryChange={handleCategoryChange} />
          <Routes>
            {/* Default route for ProductGrid */}
            <Route
              path="/"
              element={
                <ProductGrid category={category} searchQuery={searchQuery} />
              }
            />

            {/* Route for specific product details */}
            <Route path="/product" element={<ProductPage />} />

            {/* Route for specific category */}
            <Route path="/category/:categoryName" element={<CategoryPage />} />

            {/* Route for RigBuilder */}
            <Route path="/rig-builder" element={<RigBuilder />} />

            {/* Route for AddToCartPage */}
            <Route path="/add-to-cart" element={<AddToCartPage />} />

            {/* Route for CheckoutPage */}
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
