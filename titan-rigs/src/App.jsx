import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Slider from "./components/Slider";
import CategoryTiles from "./components/CategoryTiles";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (query) => {
    setSearchQuery(query);
    // Fetch products matching the search query
    const response = await fetch(
      `/api/products?search=${query}&category=${category}`
    );
    const data = await response.json();
    setProducts(data);
  };

  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory);
    // Fetch products for the selected category
    const response = await fetch(`/api/products?category=${newCategory}`);
    const data = await response.json();
    setProducts(data);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <SearchBar onSearch={handleSearch} />
        <Slider onCategoryChange={handleCategoryChange} />
        <CategoryTiles onCategoryChange={handleCategoryChange} />
        <Routes>
          <Route
            path="/"
            element={
              <ProductGrid
                products={products}
                category={category}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
