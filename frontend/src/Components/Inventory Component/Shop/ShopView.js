import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopUser from "./ShopUser";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import shop from "../Shop/shop.png";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon from react-icons (Font Awesome)

const URL = "http://localhost:5000/inventory";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

export default function Shopview() {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [filteredInventory, setFilteredInventory] = useState([]); // For filtered items
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate(); // Use navigate to redirect to cart page

  // Fetch inventory data
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Inventory data:", data.inventory);
      setInventory(data.inventory);
      setFilteredInventory(data.inventory);
    });
  }, []);

  // search filtering
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredInventory(inventory); // if search is empty
      setNoResults(false);
    } else {
      const filtered = inventory.filter((item) =>
        item.productname.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredInventory(filtered);
      setNoResults(filtered.length === 0); // If no items found
    }
  }, [searchQuery, inventory]);

  return (
    <div>
      <div className="relative z-10 ">
        <NavigationBar />
      </div>

      {/* Search bar with cart icon */}
      <div className="p-6">
        <img src={shop} alt="shop" className="mx-auto object-contain" />
        <br />
        <br />

        <div className="flex items-center p-4">
          {/* Search input field */}
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search items"
            className="border border-black rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#A78F51] mr-4 "
          />

          {/* Cart Icon */}
          <button
            className="text-[#A78F51] text-xl hover:text-gray flex items-center"
            onClick={() => navigate("/cart")} // Navigate to cart page when clicked
          >
            <FaShoppingCart style={{ fontSize: "40px" }} />
          </button>
        </div>

        {/*  if no results found */}
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
