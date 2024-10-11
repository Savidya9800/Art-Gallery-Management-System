import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.productname === item.productname);

      // If the item exists in the cart, increase its quantity
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productname === item.productname
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // Otherwise, add the new item to the cart with quantity 1
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Function to update the quantity of a specific item in the cart
  const updateQuantity = (productname, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productname === productname
          ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity never goes below 1
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (productname) => {
    setCart((prevCart) => prevCart.filter((item) => item.productname !== productname));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to get the total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to get the total price of all items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
