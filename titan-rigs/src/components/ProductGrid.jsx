import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './Productcard';
import './ProductGrid.css';

const ProductGrid = ({ category, search }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
    // Clear previous products if category or search changes
    return () => setProducts([]);
  }, [category, search]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { page: currentPage, category, search },
      });
      setProducts(prev => [...prev, ...response.data.products]);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={`${product.category}-${product.id}`}
            product={{
              ...product,
              image: `http://localhost:5000/assets/${product.category}/${product.id}.jpg`, // Assuming images follow a naming convention
            }}
          />
        ))}
      </div>
      {products.length > 0 && (
        <button className="load-more-button" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductGrid;
