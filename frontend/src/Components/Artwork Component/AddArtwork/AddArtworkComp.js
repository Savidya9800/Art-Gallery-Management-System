import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import img2 from "./photo56.png";
import { Link } from "react-router-dom";

// Add Artwork Component
function AddArtworkComp() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    pNumber: "",
    website: "",
    biography: "",
    statement: "",
    title: "",
    medium: "",
    dimensions: "",
    date: "",
    description: "",
    //img: "",
    place: "",
    tags: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // To keep track of the current form step

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setInputs((prevState) => ({
      ...prevState,
      img: imageUrl, // Update img field with the uploaded image URL or file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    history("/mainArtworkDetails");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/artWorks", {
        name: String(inputs.name),
        email: String(inputs.email),
        pNumber: Number(inputs.pNumber),
        website: String(inputs.website),
        biography: String(inputs.biography),
        statement: String(inputs.statement),
        title: String(inputs.title),
        medium: String(inputs.medium),
        dimensions: String(inputs.dimensions),
        date: String(inputs.date),
        description: String(inputs.description),
        //img: String(inputs.img),
        place: String(inputs.place),
        tags: String(inputs.tags),
      })
      .then((res) => res.data);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div className=" relative w-[523px] h-[800px]">
            <div className="absolute w-[513px] h-[776px] bg-white border-2 border-black rounded-[25px]"></div>
            <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
              Artwork Submission form
            </div>
            <div className=" bg-white absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-t-[4px] border-b border-[#B2B2B2] text-[#767676] text-[16px] font-[400] font-Inter">
              Artist Information
            </div>
            <div className=" bg-white absolute left-[26px] top-[125px] text-black text-[18px] font-[400] font-Inter ">
              Full Name
            </div>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
            />

            <div className=" bg-white absolute left-[25px] top-[222px] text-black text-[18px] font-[400] font-Inter">
              Email
            </div>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
              value={inputs.email}
              className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[252px] border border-black rounded-[15px]"
            ></input>

            <div className=" bg-white absolute left-[25px] top-[316px] text-black text-[18px] font-[400] font-Inter">
              Phone Number
            </div>
            <input
              type="text"
              name="pNumber"
              onChange={handleChange}
              value={inputs.pNumber}
              className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[348px] border border-black rounded-[15px]"
            ></input>

            <div className=" bg-white absolute left-[25px] top-[408px] text-black text-[18px] font-[400] font-Inter">
              Website/Portfolio
            </div>
            <input
              type="text"
              name="website"
              onChange={handleChange}
              value={inputs.website}
              className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[440px] border border-black rounded-[15px]"
            ></input>

            <div className=" bg-white absolute left-[28px] top-[508px] text-black text-[18px] font-[400] font-Inter">
              Biography
            </div>

            <input
              type="text"
              name="biography"
              onChange={handleChange}
              value={inputs.biography}
              className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[540px] border border-black rounded-[15px]"
            ></input>

            <div className=" bg-white absolute left-[25px] top-[603px] text-black text-[18px] font-[400] font-Inter">
              Artist Statement
            </div>
            <input
              type="text"
              name="statement"
              onChange={handleChange}
              value={inputs.statement}
              className=" bg-white absolute w-[468px] h-[107px] left-[25px] top-[635px] border border-black rounded-[15px]"
            ></input>

            <Button
              className="absolute left-[433px] top-[796px]"
              onClick={nextStep}
            >
              Next
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className=" relative w-[523px] h-[830px]">
            <div className="absolute w-[513px] h-[776px] bg-white border-2 border-black rounded-[25px]"></div>
            <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
              Artwork Submission form
            </div>
            <div className=" bg-white absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-t-[4px] border-b border-[#B2B2B2] text-[#767676] text-[16px] font-[400] font-Inter">
              Artwork Details
            </div>
            <div className=" bg-white absolute left-[26px] top-[125px] text-black text-[18px] font-[400] font-Inter ">
              Title of Artwork
            </div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={inputs.title}
              className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
            />

            <div className=" bg-white absolute left-[25px] top-[222px] text-black text-[18px] font-[400] font-Inter">
              Medium
            </div>
            <select
              name="medium"
              onChange={handleChange}
              value={inputs.medium}
              className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[252px] border border-black rounded-[15px]"
            >
              <option value="">Select Medium</option>
              <option value="clay">Clay</option>
              <option value="wood">Wood</option>
              <option value="paint">Paint</option>
              <option value="fabric">Fabric</option>
              <option value="charcoal">Charcoal</option>
            </select>

            <div className=" bg-white absolute left-[25px] top-[316px] text-black text-[18px] font-[400] font-Inter">
              Dimensions
            </div>
            <select
              name="dimensions"
              onChange={handleChange}
              value={inputs.dimensions}
              className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[348px] border border-black rounded-[15px]"
            >
              <option value="">Select Dimensions</option>
              <option value="1080x1080">1080 x 1080 px</option>
              <option value="1600x900">1600 x 900 px</option>
              <option value="1200x630">1200 x 630 px</option>
              <option value="1920x1080">1920 x 1080 px</option>
            </select>

            <div className=" bg-white absolute left-[25px] top-[408px] text-black text-[18px] font-[400] font-Inter">
              Date Created
            </div>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date}
              className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[440px] border border-black rounded-[15px]"
            ></input>

            <div className=" bg-white absolute left-[28px] top-[508px] text-black text-[18px] font-[400] font-Inter">
              Description
            </div>

            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={inputs.description}
              className=" bg-white absolute w-[468px] h-[107px] left-[26px] top-[540px] border border-black rounded-[15px]"
            ></input>

            <Button
              className="absolute left-[50px] top-[796px]"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              className="absolute left-[433px] top-[796px]"
              onClick={nextStep}
            >
              Next
            </Button>
          </div>
        )}

        {currentStep === 3 && (
          <div className=" relative w-[523px] h-[830px]">
            <div className="absolute w-[513px] h-[776px] bg-white border-2 border-black rounded-[25px]"></div>
            <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
              Artwork Submission form
            </div>
            <div className=" bg-white absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-t-[4px] border-b border-[#B2B2B2] text-[#767676] text-[16px] font-[400] font-Inter">
              Artwork Upload
            </div>

            <div className=" bg-white absolute left-[26px] top-[125px] text-black text-[18px] font-[400] font-Inter ">
              Upload Artwork Image
            </div>
            <br></br>

            <div className="bg-white absolute left-[26px] top-[165px]">
              <a
                href="/mainUploadImage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="bg-white size-12"
                  src={img2}
                  alt="Upload Image"
                />
              </a>
              <h6 className="mt-1 text-sm text-red-500 bg-white">
                Only JPG Image are accepted and must be smaller than 1MB in size
              </h6>
            </div>

            <div className=" bg-white absolute left-[25px] top-[272px] text-black text-[18px] font-[400] font-Inter">
              Place the Artwork
            </div>

            <div className="bg-white absolute left-[26px] top-[302px] text-black text-[16px] font-[400] font-Inter">
              <label className="inline-flex items-center bg-white">
                <input
                  type="radio"
                  name="place"
                  onChange={handleChange}
                  checked={inputs.place === "bidding"} // Bind to state
                  value="bidding"
                  className="mr-2"
                  //className=" bg-white absolute  left-[26px] top-[252px] border border-black rounded-[15px]"
                ></input>
                Bidding
              </label>
            </div>

            <div className="bg-white absolute left-[26px] top-[352px] text-black text-[16px] font-[400] font-Inter">
              <label className="bg-white ">
                <input
                  type="radio"
                  name="place"
                  onChange={handleChange}
                  checked={inputs.place === "promote"} // Bind to state
                  value="promote"
                  className="mr-2"
                  //className=" bg-white absolute   border-black ]"
                ></input>
                Promote
              </label>
            </div>

            <div className=" bg-white absolute left-[25px] top-[396px] text-black text-[18px] font-[400] font-Inter">
              Image Tags
            </div>
            <input
              type="text"
              name="tags"
              onChange={handleChange}
              value={inputs.tags}
              className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[428px] border border-black rounded-[15px]"
            ></input>

            <Button
              className="absolute left-[50px] top-[796px]"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button
              className="absolute left-[433px] top-[796px]"
              onClick={nextStep}
            >
              Next
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className=" relative w-[523px] h-[830px]">
            <div className="absolute w-[513px] h-[776px] bg-white border-2 border-black rounded-[25px]"></div>
            <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
              Artwork Submission form
            </div>
            <div className=" bg-white absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-t-[4px] border-b border-[#B2B2B2] text-[#767676] text-[16px] font-[400] font-Inter">
              Artwork Payment
            </div>

            <div className=" bg-white absolute left-[26px] top-[125px] text-black text-[18px] font-[400] font-Inter ">
              Payment
            </div>
            <br></br>

            <div className="bg-white absolute left-[26px] top-[165px]">
              <a
                href="/mainUploadReceipt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn btn-primary">
                  Upload Receipt
                </button>
              </a>
            </div>

            <Button
              className="absolute left-[50px] top-[796px]"
              onClick={prevStep}
            >
              Back
            </Button>
            <Button className="absolute left-[433px] top-[796px]" type="submit">
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddArtworkComp;
