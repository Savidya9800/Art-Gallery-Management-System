import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [errorMessages, setErrorMessages] = useState({}); // Track error messages per item

  const handleQuantityChange = (productname, quantity, itemCount) => {
    if (quantity > itemCount) {
      setErrorMessages(prevErrors => ({
        ...prevErrors,
        [productname]: `Quantity can't exceed available stock (${itemCount}).`
      }));
    } else {
      setErrorMessages(prevErrors => ({
        ...prevErrors,
        [productname]: ''
      }));
      updateQuantity(productname, quantity);
    }
  };

  // Calculate the total price for all items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const Navigate = useNavigate();

  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((item) => (
                <li
                  key={item.productname}
                  className="flex justify-between items-center py-4 bg-white rounded-lg shadow-md p-4 mb-4"
                >
                  <div className='bg-white'>
                    <h2 className="bg-white text-xl font-semibold text-gray-800">
                      {item.productname}
                    </h2>
                    <p className="bg-white text-gray-600">
                      Price: LKR {item.price.toFixed(2)}
                    </p>
                    <p className="bg-white text-gray-600">
                      Available Stock: {item.itemCount}
                    </p>
                    <div className="bg-white flex items-center mt-2">
                      <p className="bg-white text-gray-600">Quantity:</p>
                      <input 
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.productname,
                            Number(e.target.value),
                            item.itemCount
                          )
                        }
                        className="bg-white w-16 border border-black mx-2 text-center text-gray-800 rounded-lg focus:outline-none"
                      />
                    </div>
                    {errorMessages[item.productname] && (
                      <p className="bg-white text-red-500 text-sm">
                        {errorMessages[item.productname]}
                      </p>
                    )}
                  </div>
                  <div className="bg-white text-right">
                    <p className="bg-white text-lg font-semibold text-gray-800">
                      Total: LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productname)}
                      className="text-red-500 mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-300 pt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Full Total: LKR {calculateTotal()}
              </h2>
              <button
                onClick={() => Navigate("/paymentgateway")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
              >
                Pay Now
              </button>
            </div>
          </>
        )}
      </div>
      <FooterComp />
    </div>
  );
};

export default CartPage;
