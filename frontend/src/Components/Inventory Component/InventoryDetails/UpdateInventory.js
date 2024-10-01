import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";

function UpdateInventory() {
  const [inputs, setInputs] = useState({
    productname: "",
    price: "",
    itemCount: "",
    date: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/inventory/${id}`);
        const data = await res.data;
        // Assuming date comes in a compatible format, or you might want to format it
        setInputs(data.inventory);
      } catch (err) {
        console.error("Error fetching inventory: ", err);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/inventory/${id}`, {
        productname: String(inputs.productname),
        price: Number(inputs.price),
        itemCount: Number(inputs.itemCount),
        date: String(inputs.date), // Ensure date is in a compatible format like YYYY-MM-DD
      });
    } catch (err) {
      console.error("Error updating inventory: ", err);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/itemview"));
  };

  return (
    <div className="relative z-10 ">
      <NavigationBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Update Inventory</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productname"
              onChange={handleChange}
              value={inputs.productname || ""}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm
             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              value={inputs.price || ""}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Count
            </label>
            <input
              type="text"
              name="itemCount"
              onChange={handleChange}
              value={inputs.itemCount || ""}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm
             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date ? inputs.date.split("T")[0] : ""}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm
             focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update
          </button>
        </form>
      </div>
      <FooterComp />
    </div>
  );
}

export default UpdateInventory;