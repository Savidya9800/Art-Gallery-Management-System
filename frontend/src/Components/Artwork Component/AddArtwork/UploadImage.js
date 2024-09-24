import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";

function UploadImage() {
  const [title, settitle] = useState("");
  const [file, saveFile] = useState("");
  const [allpdf, setAllpdf] = useState("");

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    const result = await axios.get("http://localhost:5000/getFile");
    console.log(result.data.data);
    setAllpdf(result.data.data);
  };

  const submitpdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadFile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);

      if (result.data.status === 200) {
        alert("Image uploaded successfully");
        getpdf();
      } else {
        alert("Image not uploaded");
      }
    } catch (error) {
      console.log("Error Uploading :" + error.message);
      alert("Error Uploading");
    }
  };

  return (
    <div>
      <NavigationBar />
      <br></br>
      <br></br>
      <form
        onSubmit={submitpdf}
        className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md "
      >
        <label className="block text-sm font-medium text-gray-700 bg-white">
          Image Title
        </label>
        <input
          required
          type="text"
          placeholder="Enter Image Title"
          onChange={(e) => settitle(e.target.value)}
          className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mt-4 text-sm font-medium text-gray-700 bg-white">
          Select Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => saveFile(e.target.files[0])}
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
