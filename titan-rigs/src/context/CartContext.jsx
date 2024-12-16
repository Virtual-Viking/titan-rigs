import React, { createContext, useState } from "react";

// CartContext setup
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if a product with the same 'name' and 'model' already exists in the cart
      const existingProduct = prevCart.find(
        (item) => item.name === product.name && item.model === product.model
      );

      if (existingProduct) {
        // If product exists, increment its quantity
        return prevCart.map((item) =>
          item.name === product.name && item.model === product.model
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If product does not exist, add it to the cart with a quantity of 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
