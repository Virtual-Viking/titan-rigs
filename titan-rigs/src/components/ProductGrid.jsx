import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Component to render individual product
import "./ProductGrid.css"; // Add styling for the grid

const ProductGrid = ({ category, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(category || "all");
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm || "");

  useEffect(() => {
    // Reset products and page when category or search term changes
    setProducts([]);
    setPage(1);
    fetchProducts(1, currentCategory, currentSearchTerm);
  }, [currentCategory, currentSearchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { page: currentPage, category, search },
      });
      console.log('Fetched products:', response.data.products);
      setProducts(prev => [...prev, ...response.data.products]);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, currentCategory, currentSearchTerm);
  };

  const handleCategoryChange = (newCategory) => {
    setCurrentCategory(newCategory);
    setCurrentSearchTerm(""); // Clear search term when category changes
  };

  const handleSearch = (term) => {
    setCurrentSearchTerm(term);
    setCurrentCategory("all"); // Reset category when searching
  };

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <button className="load-more-button" onClick={loadMore}>
        Load More
      </button>
    </div>
  );
};

export default ProductGrid;
