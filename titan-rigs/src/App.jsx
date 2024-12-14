import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Slider from "./components/Slider";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import ProductPage from "./components/ProductPage";

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
          <Route
            path="/"
            element={
              <ProductGrid
                category={category}
                search={searchQuery}
              />
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
