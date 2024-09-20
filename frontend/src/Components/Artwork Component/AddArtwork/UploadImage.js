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
      <form onSubmit={submitpdf}>
        <label>Image title</label>
        <br></br>
        <input
          required
          type="text"
          onChange={(e) => settitle(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <label>Select Pdf File</label>
        <br></br>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => saveFile(e.target.files[0])}
          required
        ></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>
      <FooterComp />
    </div>
  );
}

export default UploadImage;
