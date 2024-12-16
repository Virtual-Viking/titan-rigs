import React, { createContext, useState } from "react";

// CartContext setup
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add multiple products to the cart

  const addToCart = (products) => {
    // Ensure `products` is always an array, even if it's a single product
    const productsToAdd = Array.isArray(products) ? products : [products];

    setCart((prevCart) => {
      let updatedCart = [...prevCart];

      productsToAdd.forEach((product) => {
        const existingProduct = updatedCart.find(
          (item) => item.id === product.id && item.name === product.name
        );

        if (existingProduct) {
          // If product exists, increment its quantity
          updatedCart = updatedCart.map((item) =>
            item.id === product.id && item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // If product does not exist, add it to the cart with a quantity of 1
          updatedCart.push({ ...product, quantity: 1 });
        }
      });

      return updatedCart;
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
