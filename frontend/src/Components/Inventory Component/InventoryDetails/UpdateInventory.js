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
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/inventory/${id}`);
        const data = await res.data;
        setInputs(data.inventory);
      } catch (err) {
        console.error("Error fetching inventory: ", err);
      }
    };
    fetchHandler();
  }, [id]);

  const validate = () => {
    let tempErrors = {};
    const productNamePattern = /^[a-zA-Z\s\W]+$/;
    tempErrors.productname =
      inputs.productname && productNamePattern.test(inputs.productname)
        ? ""
        : "Product name must contain only letters and special characters, no numbers allowed.";

    const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;
    tempErrors.price =
      inputs.price &&
      pricePattern.test(inputs.price) &&
      Number(inputs.price) > 0
        ? ""
        : "Price must be a valid positive number.";

    tempErrors.itemCount =
      inputs.itemCount &&
      !isNaN(inputs.itemCount) &&
      Number(inputs.itemCount) >= 0
        ? ""
        : "Item count must be a valid positive number.";

    // Date validation for today only
    const today = new Date().toISOString().split("T")[0];
    tempErrors.date = inputs.date === today ? "" : "Date must be today's date.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("productname", inputs.productname);
    formData.append("price", inputs.price);
    formData.append("itemCount", inputs.itemCount);
    formData.append("date", inputs.date);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axios.put(`http://localhost:5000/inventory/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      sendRequest().then(() => history("/itemview"));
    } else {
      console.log("Form contains errors");
    }
  };

  return (
    <div className="relative z-10 bg-gray-50 min-h-screen flex flex-col">
      <NavigationBar />
      <div >
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="bg-white text-3xl font-semibold mb-6 text-gray-800 text-center">
            Update Inventory
          </h1>
          <form onSubmit={handleSubmit} className="bg-white space-y-6">
            <div className="bg-white">
              <label className="bg-white block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productname"
                onChange={handleChange}
                value={inputs.productname || ""}
                required
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.productname && (
                <p className="bg-white text-red-500 text-xs mt-1">
                  {errors.productname}
                </p>
              )}
            </div>

            <div className="bg-white">
              <label className="bg-white block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                value={inputs.price || ""}
                required
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.price && (
                <p className="bg-white text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div className="bg-white">
              <label className="bg-white block text-sm font-medium text-gray-700">
                Item Count
              </label>
              <input
                type="number"
                name="itemCount"
                onChange={handleChange}
                value={inputs.itemCount || ""}
                required
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.itemCount && (
                <p className="bg-white text-red-500 text-xs mt-1">{errors.itemCount}</p>
              )}
            </div>

            <div className="bg-white">
              <label className="bg-white block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={inputs.date ? inputs.date.split("T")[0] : ""}
                required
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.date && (
                <p className="bg-white text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>

            <div className="bg-white">
              <label className="bg-white block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="bg-white flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

              >
                Update Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default UpdateInventory;
