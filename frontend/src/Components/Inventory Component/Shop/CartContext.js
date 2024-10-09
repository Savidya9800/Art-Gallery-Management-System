import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.productname === item.productname);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productname === item.productname
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (productname, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productname === productname ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productname) => {
    setCart((prevCart) => prevCart.filter((item) => item.productname !== productname));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
