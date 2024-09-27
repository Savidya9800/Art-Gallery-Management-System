import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";

function SendPdf() {
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
    formData.append("file", file);
    console.log(file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);

      if (result.data.status === 200) {
        alert("Payment Receipt uploaded successfully");
      } else {
        alert("Payment Receipt not uploaded");
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
      <div className="flex items-center justify-center flex-grow">
        <form
          onSubmit={submitpdf}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-4 text-xl font-semibold bg-white">
            Upload Receipt
          </h2>
          <label className="block mb-2 text-sm font-medium text-gray-700 bg-white">
            Select Receipt PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => saveFile(e.target.files[0])}
            className="w-full p-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br></br>
          <br></br>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      </div>
      <FooterComp />
    </div>
  );
}

export default SendPdf;
