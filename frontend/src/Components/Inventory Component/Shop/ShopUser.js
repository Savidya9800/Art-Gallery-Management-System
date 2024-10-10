import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export default function ShopUser({ INVENTORY }) {
  const { productname, price, itemCount: initialItemCount, image } = INVENTORY;
  const { addToCart } = useContext(CartContext);

  const [itemCount, setItemCount] = useState(initialItemCount);

  const handleAddToCart = () => {
    if (itemCount > 0) {
      addToCart({ productname, price, image });
      alert(`${productname} has been added to the cart!`);
      setItemCount((prevCount) => prevCount - 1);
    } else {
      alert("No more items available in stock!");
    }
  };

  return React.createElement(
    "div",
    { className: "bg-white shadow-md rounded-lg p-4 border border-gray-300 mx-auto" },
    React.createElement(
      "div",
      { className: "bg-white" },
      image
        ? React.createElement("img", {
            src: `http://localhost:5000/images/${image}`,
            className: "bg-white w-40 h-40 object-cover",
            alt: "product"
          })
        : React.createElement("span", { className: "bg-white" }, "No Image")
    ),
    React.createElement("h2", { className: "bg-white text-xl font-bold mb-2" }, productname),
    React.createElement("p", { className: "bg-white text-lg" }, `Price: LKR ${price.toFixed(2)}`),
    React.createElement("p", { className: "bg-white text-lg" }, `Available items: ${itemCount}`),
    React.createElement(
      "div",
      { className: "bg-white flex justify-between mt-4" },
      React.createElement(
        "button",
        {
          className: "bg-[#A78F51] hover:bg-black text-white font-bold py-2 px-4 rounded-full flex-1 mr-2",
          onClick: handleAddToCart
        },
        "Add to cart"
      )
    )
  );
}
