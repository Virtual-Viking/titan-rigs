import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Import CartContext
import "./AddToCartPage.css";

const AddToCartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext); // Access cart and removeFromCart function

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image_url || "default-image-placeholder.png"}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="remove-item-button"
                  onClick={() => removeFromCart(item.id)} // Remove item from cart
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total Price: ${calculateTotalPrice().toFixed(2)}</h2>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartPage;
