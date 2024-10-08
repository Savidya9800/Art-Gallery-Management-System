import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (productname, quantity) => {
    updateQuantity(productname, quantity);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.productname} className="flex justify-between mb-2">
              <div>
                <h2>{item.productname}</h2>
                <p>Price: LKR {item.price.toFixed(2)}</p>
                <p>
                  Quantity: 
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.productname, Number(e.target.value))}
                    className="w-16 border border-gray-300 mx-2"
                  />
                </p>
              </div>
              <div>
                <p>Total: LKR {(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.productname)} className="text-red-500">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;

