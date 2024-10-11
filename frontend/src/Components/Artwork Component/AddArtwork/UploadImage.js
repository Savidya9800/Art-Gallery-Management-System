import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";

function UploadImage() {
  const [image, setImage] = useState(null); //image insert

  const submitImg = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadImg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);

      if (result.data.status === 200) {
        alert("Image uploaded successfully");
        setImage();
      } else {
        alert("Image not uploaded");
      }
    } catch (error) {
      console.log("Error Uploading :" + error.message);
      alert("Error Uploading");
    }
  };

  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <br></br>
      <br></br>
      <form
        onSubmit={submitImg}
        className="max-w-md p-6 mx-auto mb-8 bg-white rounded-lg shadow-md"
      >
        <label className="block mt-4 text-sm font-medium text-gray-700 bg-white">
          Select Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onImgChange}
          required
          className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 mt-6 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Artwork Image
        </button>
      </form>

      <FooterComp />
    </div>
  );
}

export default UploadImage;
