import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import heartIcon from "../assets/heart.svg";
import "./ProductPage.css";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    // Fetch product details based on the productId
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [productId]);

  const addToCart = () => {
    if (qty > 0) {
      console.log(`Added ${qty} ${product.name} to the cart.`);
    } else {
      setQty(1);
    }
  };

  const buyNow = () => {
    console.log(`Bought ${qty} ${product.name}.`);
  };

  const increaseQty = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else if (qty === 1) {
      setQty(0); // Removes the item from the cart
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      {/* Left section - Image slider */}
      <div className="product-images">
        <img className="big-image" src={product.images[0]} alt={product.name} />
        <div className="image-thumbnails">
          {product.images.map((image, index) => (
            <img
              key={index}
              className="thumbnail"
              src={image}
              alt={`Thumbnail ${index}`}
            />
          ))}
        </div>
      </div>

      {/* Right section - Details */}
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h1 className="product-name">{product.name}</h1>
        <hr className="divider" />
        <div
          className={`wishlist-icon ${wishlist ? "active" : ""}`}
          onClick={() => setWishlist(!wishlist)}
        >
          <img src={heartIcon} alt="Wishlist" />
        </div>
        <div className="qty-section">
          {qty === 0 ? (
            <button className="qty-btn" onClick={() => setQty(1)}>
              Qty
            </button>
          ) : (
            <div className="qty-controls">
              <button className="qty-btn" onClick={decreaseQty}>
                -
              </button>
              <span className="qty-number">{qty}</span>
              <button className="qty-btn" onClick={increaseQty}>
                +
              </button>
            </div>
          )}
          <button className="add-to-cart-btn" onClick={addToCart}>
            Add to Cart
          </button>
          <button className="buy-now-btn" onClick={buyNow}>
            Buy Now
          </button>
        </div>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductPage;
