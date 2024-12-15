import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css"; // Import the CSS file for styling

const ProductPage = () => {
  const { name, category } = useParams(); // Get the name and category from the URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Call the API to fetch product details
        const response = await fetch(
          `http://localhost:5000/api/product/search?name=${encodeURIComponent(
            name
          )}&category=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [name, category]);

  if (loading) {
    return <div className="product-page-loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="product-page-error">{error}</div>;
  }

  return (
    <div className="product-page">
      <div className="product-details-container">
        <h1 className="product-title">{product.product.name}</h1>
        <div className="product-details">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.product.name}
              className="product-main-image"
            />
          </div>
          <div className="product-info-container">
            <p><strong>Brand:</strong> {product.product.brand}</p>
            <p><strong>Model:</strong> {product.product.model}</p>
            <p><strong>Chipset:</strong> {product.product.chipset}</p>
            <p><strong>Socket:</strong> {product.product.socket}</p>
            <p><strong>Max TDP:</strong> {product.product.maxtdp}W</p>
            <p><strong>Price:</strong> ${product.product.price}</p>
            <p><strong>Release Date:</strong> {new Date(product.product.release_date).toLocaleDateString()}</p>
            <p><strong>Offers:</strong> {product.product.offers}</p>
            <p><strong>Stock:</strong> {product.product.qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
