import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Import the CartContext
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext); // Access the cart from context

  // Function to calculate total price
  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h1>Order Placed Successfully!</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div>
          {/* Order Details (Bill Summary) */}
          <div className="bill-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <img
                    src={item.image_url || "default-image-placeholder.png"}
                    alt={item.name}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="total-price">
              <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="confirmation-message">
            <p>Thank you for your order! Your items will be shipped shortly.</p>
            <button className="back-to-home-button">Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
