import React, {  useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";

function UploadReceipt() {
  const [file, saveFile] = useState("");
  const [allpdf, setAllpdf] = useState("");
  const submitpdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadReceipt",
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
      <form onSubmit={submitpdf}>
        <label>Select Receipt PDF</label>
        <br></br>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => saveFile(e.target.files[0])}
          required
        ></input>
        <br></br>
        <button>Upload</button>
      </form>
      <FooterComp />
    </div>
  );
}

export default UploadReceipt;
