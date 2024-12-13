import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import img2 from "../Images/photo56.png";

// Add Artwork Component
function AddArtworkComp() {
  const history = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    website: "",
    statement: "",
    title: "",
    description: "",
  });
  const [imgId, setImgId] = useState("");
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const fetchLastImage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getImage");
      console.log(res.data.data);
      if (res.data.data.length > 0) {
        setImgId(res.data.data[0]._id); // Set the ID of the last uploaded image
      } else {
        console.log("No images found");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (imgId) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        img: imgId,
      }));
    }
  }, [imgId]);

  const handleFetchImage = () => {
    fetchLastImage();
  };

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
    img: imgId,
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
    }
    // Validate email to match the abc@gmail.com format
    else if (
      name === "email" &&
      !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email must be in the format abc@gmail.com.",
      }));
    }
    // Validate Website/Portfolio to end with .com or .lk
    else if (
      name === "website" &&
      !/^(https?:\/\/)?([a-zA-Z0-9.-]+)\.(com|lk)$/.test(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        website: "Website must end with .com or .lk.",
      }));
    }
    // Validate Artist Statement to not exceed 10 words
    else if (
      name === "statement" &&
      value.split(" ").filter(Boolean).length > 10
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        statement: "Artist Statement can only contain up to 10 words.",
      }));
    }
    // Validate Title of Artwork to restrict symbols and numbers
    else if (name === "title" && !/^[a-zA-Z\s\-']*$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title:
          "Title can only contain letters, spaces, hyphens, and apostrophes.",
      }));
    }
    // Validate Description to not exceed 15 words
    else if (
      name === "description" &&
      value.split(" ").filter(Boolean).length > 15
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description can only contain up to 15 words.",
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

    // Fetch the last image if needed (optional)
    await handleFetchImage();

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
      history("/mainHome");
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
        img: String(imgId),
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

  const handleTagClick = (tag) => {
    // Append the clicked tag to the input value
    const updatedTags = inputs.tags ? `${inputs.tags} ${tag}` : tag;
    handleChange({ target: { name: "tags", value: updatedTags } });
  };

  return (
    <form className="form ml-[60%] mt-4" onSubmit={handleSubmit}>
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
            required
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
          />
          {errors.name && (
            <div className="text-red-500 absolute left-[26px] top-[205px] bg-white text-xs">
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
            required
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[252px] border border-black rounded-[15px]"
          ></input>
          {errors.email && (
            <div className="text-red-500 absolute left-[26px] top-[300px] bg-white text-xs">
              {errors.email}
            </div>
          )}

          <div className="bg-white absolute left-[25px] top-[316px] text-black text-[18px] font-[400] font-Inter">
            Phone Number
          </div>

          <input
            type="text"
            name="pNumber"
            required
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
          />

          <div className=" bg-white absolute left-[25px] top-[408px] text-black text-[18px] font-[400] font-Inter">
            Website/Portfolio
          </div>
          <input
            type="text"
            name="website"
            onChange={handleChange}
            value={inputs.website}
            required
            className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[440px] border border-black rounded-[15px] pl-4"
          ></input>
          {errors.website && (
            <div className="text-red-500 absolute left-[26px] top-[488px] bg-white text-xs">
              {errors.website}
            </div>
          )}

          <div className=" bg-white absolute left-[28px] top-[508px] text-black text-[18px] font-[400] font-Inter">
            Biography
          </div>

          <input
            type="text"
            name="biography"
            onChange={handleChange}
            value={inputs.biography}
            required
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
            required
            className="pl-4 bg-white absolute w-[468px] h-[107px] left-[25px] top-[635px] border border-black rounded-[15px]"
          ></input>
          {errors.statement && (
            <div className="text-red-500 absolute left-[26px] top-[746px] bg-white text-xs">
              {errors.statement}
            </div>
          )}

          {/* Disable the button if any of the fields are empty */}
          <Button
            className="absolute left-[433px] top-[796px]"
            onClick={nextStep}
            disabled={
              !inputs.name ||
              !inputs.email ||
              !inputs.pNumber ||
              !inputs.website ||
              !inputs.biography ||
              !inputs.statement
            }
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
            required
            className="pl-4 bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
          />
          {errors.title && (
            <div className="text-red-500 absolute left-[26px] top-[205px] bg-white text-xs">
              {errors.title}
            </div>
          )}

          <div className=" bg-white absolute left-[25px] top-[222px] text-black text-[18px] font-[400] font-Inter">
            Medium
          </div>
          <select
            name="medium"
            onChange={handleChange}
            value={inputs.medium}
            required
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
            required
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
            required
            max={todayString} // Restrict future dates
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
            required
            className="pl-4  bg-white absolute w-[468px] h-[110px] left-[26px] top-[540px] border border-black rounded-[15px]"
          ></input>
          {errors.description && (
            <div className="text-red-500 absolute left-[26px] top-[655px] bg-white text-xs">
              {errors.description}
            </div>
          )}

          <Button
            className="absolute left-[20px] top-[726px]"
            onClick={prevStep}
          >
            Back
          </Button>

          {/* Disable the button if any of the fields are empty */}
          <Button
            className="absolute left-[433px] top-[726px]"
            onClick={nextStep}
            disabled={
              !inputs.title ||
              !inputs.medium ||
              !inputs.dimensions ||
              !inputs.date ||
              !inputs.description
            }
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
                  onChange={(e) => {
                    const value = e.target.value;
                    // Check if input is a number or empty (to allow deletion)
                    if (!isNaN(value) || value === "") {
                      handleChange(e);
                    }
                  }}
                  value={inputs.price}
                  required
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
              {["#paint", "#wallart", "#wood", "#abstract", "#portrait"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-white text-[14px] font-[400] bg-black px-2 py-1 rounded-lg cursor-pointer "
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            <input
              type="text"
              name="tags"
              onChange={handleChange}
              value={inputs.tags}
              required
              className="bg-white absolute w-[470px] h-[48px] left-[25px] top-[550px] border border-black rounded-[15px] px-4"
            />
          </div>

          <Button
            className="absolute left-[20px] top-[726px]"
            onClick={prevStep}
          >
            Back
          </Button>
          {/* Disable the button if any of the fields are empty */}
          <Button
            className="absolute left-[433px] top-[726px]"
            onClick={nextStep}
            disabled={!inputs.place || !inputs.tags}
          >
            Next
          </Button>
        </div>
      )}

      {currentStep === 4 && (
        <div className=" relative w-[523px] h-[830px]">
          <div className="absolute w-[513px] h-[324px] bg-white border-2 border-black rounded-[25px]"></div>
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
            <h6 className="mt-0 -mb-2 text-sm bg-white bg-customColor">
            Artwork Bidding fee: Rs.1500
            </h6>
            <hr></hr>
            <h6 className="mb-3 -mt-2 text-sm bg-white bg-customColor">
            Artwork Promote fee: Rs.2000
            </h6>
            <a href="/paymentgateway" target="_blank" rel="noopener noreferrer">
              <button type="button" className="btn btn-success">
                Pay Now
              </button>
            </a>
          </div>

          <Button
            className="absolute left-[20px] top-[336px]"
            onClick={prevStep}
          >
            Back
          </Button>
          <Button className="absolute left-[433px] top-[336px]" type="submit">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
}

export default AddArtworkComp;
