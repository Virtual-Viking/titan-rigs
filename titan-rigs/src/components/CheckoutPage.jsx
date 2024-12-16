import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; // Import the CartContext
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cart } = useContext(CartContext); // Access the cart from context
  const [orderPlaced, setOrderPlaced] = useState(false); // State to check if the order is placed
  const [error, setError] = useState(""); // State to store any error message

  // Function to calculate total price
  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle placing the order
  const handlePlaceOrder = async () => {
    const totalPrice = calculateTotalPrice();

    // Assuming user_id is available in CartContext or from a logged-in user
    const userId = 1; // Replace this with actual user_id from the context or authentication logic

    // Prepare order data
    const orderData = {
      user_id: userId,
      total_price: totalPrice,
      items: cart.map((item) => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    console.log("Placing order with data:", orderData); // Debugging line

    try {
      console.log("Attempting to place order..."); // Debugging line

      // Make a POST request to the backend to place the order
      const response = await fetch("http://localhost:5000/api/product/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("API response:", data); // Debugging line

      if (response.ok) {
        setOrderPlaced(true); // Mark the order as placed
        console.log("Order placed successfully:", data);
      } else {
        console.error("Error placing order:", data);
        setError(data.error || "Failed to place the order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setError("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      {orderPlaced ? (
        <div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order! Your items will be shipped shortly.</p>
          <button className="back-to-home-button">Back to Home</button>
        </div>
      ) : (
        <div>
          <h1>Review Your Order</h1>

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

              {/* Display error message if any */}
              {error && (
                <div className="error-message">
                  <p>{error}</p>
                </div>
              )}

              {/* Place Order Button */}
              <button className="place-order-button" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
