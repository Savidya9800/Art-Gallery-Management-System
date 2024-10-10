import React, { useState } from "react";
import NavigationBar from "../../Nav Component/NavigationBar";
import { useNavigate } from "react-router";
import axios from "axios";
import FooterComp from "../../Nav Component/FooterComp";

function Addinventory() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    productname: "",
    price: "",
    itemCount: "",
    date: new Date().toISOString().split("T")[0], 
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validate = () => {
    let tempErrors = {};
    const productNamePattern = /^[a-zA-Z\s\W]+$/;
    tempErrors.productname =
      inputs.productname && productNamePattern.test(inputs.productname)
        ? ""
        : "Product name must contain only letters and special characters, no numbers allowed.";

    const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;
    tempErrors.price =
      inputs.price && pricePattern.test(inputs.price) && Number(inputs.price) > 0
        ? ""
        : "Price must be a valid positive number without special characters.";

    tempErrors.itemCount =
      inputs.itemCount && !isNaN(inputs.itemCount) && Number(inputs.itemCount) >= 0
        ? ""
        : "Item count must be a valid positive number.";

    const today = new Date().toISOString().split("T")[0];
    tempErrors.date = inputs.date === today ? "" : "You can only select today's date.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitting form data:", { inputs, image });
      try {
        await sendRequest();
        history("/itemview"); 
      } catch (error) {
        console.error("Submission failed", error);
        setErrors((prevErrors) => ({ ...prevErrors, submit: "Failed to add item. Please try again." }));
      }
    } else {
      console.log("Invalid form");
    }
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("productname", inputs.productname);
    formData.append("price", inputs.price);
    formData.append("itemCount", inputs.itemCount);
    formData.append("date", inputs.date);

    if (image) {
      formData.append("image", image);
    }

    try {
      const result = await axios.post("http://localhost:5000/inventory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Result", result);
    } catch (error) {
      console.error("Error adding the item:", error.response.data); 
    }
  };

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <div className="shadow-md rounded-lg p-2">
        <button
          className="bg-[#A78F51] hover:bg-[#8e7b44] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => history("/itemview")}
        >
          Current Inventory
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold mb-6 bg-white">Add New Item</h1>

            <div className="mb-4 bg-white">
              <label className="bg-white block text-gray-700 text-sm font-bold mb-2">Product Name</label>
              <input
                type="text"
                name="productname"
                onChange={handleChange}
                value={inputs.productname}
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.productname && (
                <p className="bg-white text-red-500 text-xs mt-1">{errors.productname}</p>
              )}
            </div>

            <div className="mb-4 bg-white">
              <label className="bg-white block text-gray-700 text-sm font-bold mb-2">Price</label>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                value={inputs.price}
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.price && (
                <p className="bg-white text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div className="mb-4 bg-white">
              <label className="bg-white block text-gray-700 text-sm font-bold mb-2">Item Count</label>
              <input
                type="number"
                name="itemCount"
                onChange={handleChange}
                value={inputs.itemCount}
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {errors.itemCount && (
                <p className="text-red-500 text-xs mt-1">{errors.itemCount}</p>
              )}
            </div>

            <div className="mb-4 bg-white">
              <label className="bg-white block text-gray-700 text-sm font-bold mb-2">Date</label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={inputs.date}
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div className="mb-4 bg-white">
              <label className="bg-white block text-gray-700 text-sm font-bold mb-2">Upload Image (Optional)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex justify-center bg-white">
              <button
                type="submit"
                className="bg-[#A78F51] hover:bg-[#8e7b44] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Upload item
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default Addinventory;
