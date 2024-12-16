import React, { createContext, useState } from "react";

// CartContext setup
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if a product with the same 'id' and 'model' already exists in the cart
      const existingProduct = prevCart.find(
        (item) => item.id === product.id && item.model === product.model
      );

      if (existingProduct) {
        // If product exists, increment its quantity
        return prevCart.map((item) =>
          item.id === product.id && item.model === product.model
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If product does not exist, add it to the cart with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to clear the cart (empty all items)
  const clearCart = () => {
    setCart([]); // Empty the cart
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
