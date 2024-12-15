import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchProductImage = async (productType, productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/images/${productType}/${productId}`
      );
      const data = await response.json();
      return data.image_url || null;
    } catch (error) {
      console.error(`Error fetching image for product ${productId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/category/${categoryName}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch products for category: ${categoryName}`);
        }
        const data = await response.json();

        // Fetch images for each product
        const productsWithImages = await Promise.all(
          (data.products || []).map(async (product) => {
            const imageUrl = await fetchProductImage(categoryName, product.id);
            return { ...product, image_url: imageUrl };
          })
        );

        setProducts(productsWithImages);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="no-products">No products found in {categoryName}.</div>;
  }

  return (
    <div className="category-page">
      <h1>{categoryName.toUpperCase()}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
