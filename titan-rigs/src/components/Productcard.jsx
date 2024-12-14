import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.image_url}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;