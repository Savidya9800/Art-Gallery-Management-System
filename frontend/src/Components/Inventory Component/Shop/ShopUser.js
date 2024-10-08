import React from "react";



export default function ShopUser({ INVENTORY }) {
  const { productname, price, itemCount} = INVENTORY;

  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 w-72">
      <h2 className="bg-white text-xl font-bold mb-2">{productname}</h2>
      <p className="bg-white text-lg">Price: LKR {price.toFixed(2)}</p>
      <p className="bg-white text-lg">Available items: {itemCount}</p>
      

      <div className="bg-white flex justify-between mt-4">
        <button className="bg-[#A78F51] hover:bg-black text-white font-bold py-2 px-4 rounded flex-1 mr-2"
       >
         Add to cart 
        </button>

        
      </div>
    </div>
  );
}
