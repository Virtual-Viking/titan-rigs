import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/category/${category}`
        );
        const data = await response.json();
        setProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="no-products">No products found in {category}.</div>;
  }

  return (
    <div className="category-page">
      <h1 className="category-title">{category.toUpperCase()}</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image_url || "default-image-placeholder.png"}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-brand">{product.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;


