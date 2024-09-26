import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import img2 from "../Images/photo56.png";

// Add Artwork Component
function AddArtworkComp() {
  const history = useNavigate();
  const [errors, setErrors] = useState({ name: "", email: "" });

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
    price: "",
  });

  const [currentStep, setCurrentStep] = useState(1); // To keep track of the current form step

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate Full Name to restrict symbols and numbers
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Full Name can only contain letters and spaces.",
      }));
    } else if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email must be in the format abc@gmail.com.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const requiredFields = [
      "name",
      "email",
      "pNumber",
      "website",
      "biography",
      "statement",
      "title",
      "medium",
      "dimensions",
      "date",
      "description",
      "place",
      "tags",
    ];

    // Check if any required field is empty
    const emptyFields = requiredFields.filter((field) => !inputs[field]);

    if (emptyFields.length > 0) {
      alert(`Please fill in all fields: ${emptyFields.join(", ")}`);
      return;
    }

    try {
      await sendRequest();
      alert("Artwork Added Successfully");
      history("/mainArtworkDetails");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
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
        price: Number(inputs.price),
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
    <form className="form ml-[60%] mt-5" onSubmit={handleSubmit}>
      {currentStep === 1 && (
        <div className=" relative w-[523px] h-[800px]">
          <div className="absolute w-[513px] h-[776px] bg-white border-2 border-black rounded-[25px]"></div>

          <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
            Artwork Submission form
          </div>
          <div className="absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-md rounded-t-[4px] border-b border-gray-400 text-gray-500 text-[16px] font-normal font-Inter bg-white">
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
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
          />
          {errors.name && (
            <div className="text-red-500 absolute left-[26px] top-[205px]">
              {errors.name}
            </div>
          )}

          <div className=" bg-white absolute left-[25px] top-[222px] text-black text-[18px] font-[400] font-Inter">
            Email
          </div>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[252px] border border-black rounded-[15px]"
          ></input>
          {errors.email && (
            <div className="text-red-500 absolute left-[26px] top-[300px]">
              {errors.email}
            </div>
          )}

          <div className="bg-white absolute left-[25px] top-[316px] text-black text-[18px] font-[400] font-Inter">
            Phone Number
          </div>

          <input
            type="text"
            name="pNumber"
            onChange={(e) => {
              const value = e.target.value;
              // Ensure +94 is always present at the beginning, and enforce digit validation for the rest
              if (
                value.startsWith("+94") &&
                /^\+94\d*$/.test(value) &&
                value.length <= 12
              ) {
                handleChange(e); // Update the state only if the value is valid
              }
            }}
            value={inputs.pNumber.startsWith("+94") ? inputs.pNumber : "+94"} // Ensure the value always starts with +94
            className="bg-white absolute w-[470px] h-[48px] left-[25px] top-[348px] border border-black rounded-[15px] pl-4"
            placeholder="Enter your phone number"
            required
          />

          <div className=" bg-white absolute left-[25px] top-[408px] text-black text-[18px] font-[400] font-Inter">
            Website/Portfolio
          </div>
          <input
            type="text"
            name="website"
            onChange={handleChange}
            value={inputs.website}
            className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[440px] border border-black rounded-[15px] pl-4"
          ></input>

          <div className=" bg-white absolute left-[28px] top-[508px] text-black text-[18px] font-[400] font-Inter">
            Biography
          </div>

          <input
            type="text"
            name="biography"
            onChange={handleChange}
            value={inputs.biography}
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[540px] border border-black rounded-[15px]"
          ></input>

          <div className=" bg-white absolute left-[25px] top-[603px] text-black text-[18px] font-[400] font-Inter">
            Artist Statement
          </div>
          <input
            type="text"
            name="statement"
            onChange={handleChange}
            value={inputs.statement}
            className="pl-4 bg-white absolute w-[468px] h-[107px] left-[25px] top-[635px] border border-black rounded-[15px]"
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
          <div className="absolute w-[513px] h-[706px] bg-white border-2 border-black rounded-[25px]"></div>
          <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
            Artwork Submission form
          </div>
          <div className="absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-md rounded-t-[4px] border-b border-gray-400 text-gray-500 text-[16px] font-normal font-Inter bg-white">
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
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
          />

          <div className=" bg-white absolute left-[25px] top-[222px] text-black text-[18px] font-[400] font-Inter">
            Medium
          </div>
          <select
            name="medium"
            onChange={handleChange}
            value={inputs.medium}
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[252px] border border-black rounded-[15px]"
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
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[25px] top-[348px] border border-black rounded-[15px]"
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
            className="pl-4 pr-3 bg-white absolute w-[470px] h-[48px] left-[25px] top-[440px] border border-black rounded-[15px]"
          ></input>

          <div className=" bg-white absolute left-[28px] top-[508px] text-black text-[18px] font-[400] font-Inter">
            Description
          </div>

          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={inputs.description}
            className="pl-4  bg-white absolute w-[468px] h-[110px] left-[26px] top-[540px] border border-black rounded-[15px]"
          ></input>

          <Button
            className="absolute left-[20px] top-[726px]"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            className="absolute left-[433px] top-[726px]"
            onClick={nextStep}
          >
            Next
          </Button>
        </div>
      )}

      {currentStep === 3 && (
        <div className=" relative w-[523px] h-[830px]">
          <div className="absolute w-[513px] h-[706px] bg-white border-2 border-black rounded-[25px]"></div>
          <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
            Artwork Submission form
          </div>
          <div className="absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-md rounded-t-[4px] border-b border-gray-400 text-gray-500 text-[16px] font-normal font-Inter bg-white">
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
              <img className="bg-white size-12" src={img2} alt="Upload Image" />
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
                checked={inputs.place === "bidding"}
                value="bidding"
                className="mr-2"
              />
              Bidding
            </label>
          </div>

          {inputs.place === "bidding" && ( // Only show if 'bidding' is selected
            <div className="relative">
              <div className="bg-white absolute left-[26px] top-[320px] text-black text-[18px] font-[400] font-Inter">
                Starting BID Price
              </div>

              <div className="absolute w-[300px] h-[48px] left-[26px] top-[350px] flex items-center border border-black rounded-[15px]">
                <span className="pl-4">Rs.</span>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={inputs.price}
                  placeholder="Enter the starting bid price"
                  className="pl-2 w-full h-full border-none outline-none bg-white rounded-[15px]"
                />
              </div>
            </div>
          )}

          <div className="bg-white absolute left-[340px] top-[302px] text-black text-[16px] font-[400] font-Inter">
            <label className="bg-white">
              <input
                type="radio"
                name="place"
                onChange={handleChange}
                checked={inputs.place === "promote"}
                value="promote"
                className="mr-2"
              />
              Promote
            </label>
          </div>

          <div>
            <div className="bg-white absolute left-[25px] top-[456px] text-black text-[18px] font-[400] font-Inter">
              Image Tags
            </div>

            <div className="bg-white absolute left-[25px] top-[500px] flex space-x-2">
              <span className="text-gray-500 text-[14px] font-[400] bg-gray-100 px-2 py-1 rounded-lg">
                #paint
              </span>
              <span className="text-gray-500 text-[14px] font-[400] bg-gray-100 px-2 py-1 rounded-lg">
                #wallart
              </span>
              <span className="text-gray-500 text-[14px] font-[400] bg-gray-100 px-2 py-1 rounded-lg">
                #wood
              </span>
              <span className="text-gray-500 text-[14px] font-[400] bg-gray-100 px-2 py-1 rounded-lg">
                #abstract
              </span>
              <span className="text-gray-500 text-[14px] font-[400] bg-gray-100 px-2 py-1 rounded-lg">
                #portrait
              </span>
            </div>

            <input
              type="text"
              name="tags"
              onChange={handleChange}
              value={inputs.tags}
              className="bg-white absolute w-[470px] h-[48px] left-[25px] top-[550px] border border-black rounded-[15px] px-4"
            />
          </div>

          <Button
            className="absolute left-[20px] top-[726px]"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button
            className="absolute left-[433px] top-[726px]"
            onClick={nextStep}
          >
            Next
          </Button>
        </div>
      )}

      {currentStep === 4 && (
        <div className=" relative w-[523px] h-[830px]">
          <div className="absolute w-[513px] h-[276px] bg-white border-2 border-black rounded-[25px]"></div>
          <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
            Artwork Submission form
          </div>
          <div className="absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-md rounded-t-[4px] border-b border-gray-400 text-gray-500 text-[16px] font-normal font-Inter bg-white">
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
            className="absolute left-[20px] top-[296px]"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button className="absolute left-[433px] top-[296px]" type="submit">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
}

export default AddArtworkComp;
