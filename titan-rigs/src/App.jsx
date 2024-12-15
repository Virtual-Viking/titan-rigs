import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";
import CategoryPage from "./components/CategoryPage";
import RigBuilder from "./components/RigBuilder";

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
          <Route path="/product/:id" element={<ProductPage />} />

          {/* Route for specific category */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/rig-builder" element={<RigBuilder />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
