import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import addtocart from "../assets/add-to-cart.svg";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/images/${product.category}/${product.id}`
        );
        const data = await response.json();
        setImageUrl(data.image_url || "default-image-placeholder.png");
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchImage();
  }, [product.category, product.id]);

  const navigateToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={navigateToProductPage}>
      <img
        src={imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        <div className="add-to-cart">
          <img src={addtocart} alt="add to cart" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


