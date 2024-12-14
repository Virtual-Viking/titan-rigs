import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import heartIcon from "../assets/heart.svg";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handleQtyChange = (change) => {
    setQty((prev) => Math.max(1, prev + change));
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-page">
      <div className="product-images">
        <img
          src={images[0] || "default-image-placeholder.png"}
          alt={product.name}
          className="main-image"
        />
        <div className="image-thumbnails">
          {images.map((img, index) => (
            <img key={index} src={img} alt={`Thumbnail ${index}`} />
          ))}
        </div>
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h1 className="product-title">{product.name}</h1>
        <hr />
        <div className="wishlist">
          <img
            src={heartIcon}
            alt="Add to wishlist"
            className={`wishlist-icon ${isWishlisted ? "active" : ""}`}
            onClick={toggleWishlist}
          />
        </div>
        <div className="product-qty">
          <button onClick={() => handleQtyChange(-1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => handleQtyChange(1)}>+</button>
          <button className="add-to-cart">Add to Cart</button>
        </div>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductPage;


