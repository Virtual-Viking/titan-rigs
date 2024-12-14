import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./Productcard";
import "./ProductGrid.css";

const ProductGrid = ({ category, search }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const params = { page };
      if (category) params.category = category;
      if (search) params.search = search;

      const { data } = await axios.get("http://localhost:5000/api/products", {
        params,
      });

      if (data.products.length < 20) {
        setHasMore(false);
      }

      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Resetting when the category or search changes
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts();
  }, [category, search]);

  useEffect(() => {
    if (page > 1) {
      fetchProducts();
    }
  }, [page]);

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={`${product.category}-${product.id}`} product={product} />
        ))}
      </div>
      {hasMore && !isLoading && (
        <button className="load-more-button" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default ProductGrid;
