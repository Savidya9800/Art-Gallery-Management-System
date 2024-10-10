import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopUser from "./ShopUser";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import shop from "../Shop/shop.png";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 

const URL = "http://localhost:5000/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function Shopview() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]); 
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState(""); 
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate(); 

 
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Inventory data:", data.inventory);
      setInventory(data.inventory);
      setFilteredInventory(data.inventory);
    });
  }, []);

  // Search and price filtering
  useEffect(() => {
    let filtered = inventory;

    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.productname.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (item) => item.price >= parseFloat(minPrice) && item.price <= parseFloat(maxPrice)
      );
    }

    setFilteredInventory(filtered);
    setNoResults(filtered.length === 0); 
  }, [searchQuery, inventory, minPrice, maxPrice]);

  return (
    <div>
      <div className="relative z-10 ">
        <NavigationBar />
      </div>

      <div className="p-6">
        <img src={shop} alt="shop" className="mx-auto object-contain" />
        <br />
        <br />

        <div className="flex items-center p-4 gap-4">
  <input
    onChange={(e) => setSearchQuery(e.target.value)}
    type="text"
    name="search"
    placeholder="Search items"
    className="border border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#A78F51] transition duration-200"
  />

 
  <input
    type="number"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    placeholder="Min Price"
    className="border border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#A78F51] transition duration-200"
  />

 
  <input
    type="number"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    placeholder="Max Price"
    className="border border-gray-300 rounded-lg py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#A78F51] transition duration-200"
  />

  
  <button
    className="text-[#A78F51] text-xl hover:text-gray-600 flex items-center ml-auto"
    onClick={() => navigate("/cart")}
  >
    <FaShoppingCart style={{ fontSize: "30px" }} />
  </button>
</div>


        
        {noResults ? (
          <div className="text-center">
            <p>No results found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {filteredInventory?.length > 0 ? (
              filteredInventory.map((INVENTORY) => (
                <ShopUser key={INVENTORY._id} INVENTORY={INVENTORY} />
              ))
            ) : (
              <div className="text-center">No items found.</div>
            )}
          </div>
        )}
      </div>

      <FooterComp />
    </div>
  );
}
