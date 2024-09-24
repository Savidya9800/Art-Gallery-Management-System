import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/esm/Button";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import ExampleCarouselImage from "../Images/img6.jpeg";
import ExampleCarouselImage2 from "../Images/img8.jpeg";
import ExampleCarouselImage3 from "../Images/img9.jpeg";
import Carousel from "react-bootstrap/Carousel";

function UpdateArtwork() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/artWorks/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.artWorks));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/artWorks/${id}`, {
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
        place: String(inputs.place),
        tags: String(inputs.tags),
        price: Number(inputs.price),
      })

      .then((res) => res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
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
      alert("Artwork Update Successfully");
      history("/mainArtworkDetails");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const [currentStep, setCurrentStep] = useState(1); // To keep track of the current form step

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <NavigationBar />
      <div className="mt-8 ml-48 w-96">
        <Carousel>
          <Carousel.Item>
            <img
              className="w-full h-[550px]  object-cover"
              src={ExampleCarouselImage}
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="w-full h-[550px] object-cover"
              src={ExampleCarouselImage2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-full h-[550px] object-cover "
              src={ExampleCarouselImage3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="-mt-[570px]">
        <form className="form" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className=" relative w-[523px] h-[800px]">
              <div className="absolute w-[513px] h-[700px] bg-white border-2 border-black rounded-[25px]"></div>
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
                type="tel"
                name="pNumber"
                onChange={handleChange}
                value={inputs.pNumber}
                maxLength="10"
                pattern="\d{10}"
                className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[348px] border border-black rounded-[15px]"
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
                className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[635px] border border-black rounded-[15px]"
              ></input>

              <Button
                className="absolute left-[433px] top-[726px]"
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
                className=" bg-white absolute w-[468px] h-[110px] left-[26px] top-[540px] border border-black rounded-[15px]"
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
            <div className="relative w-[523px] h-[830px]">
              <div className="absolute w-[513px] h-[450px] bg-white border-2 border-black rounded-[25px]"></div>
              <div className="bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
                Artwork Submission form
              </div>
              <div className="absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-md rounded-t-[4px] border-b border-gray-400 text-gray-500 text-[16px] font-normal font-Inter bg-white">
                Artwork Upload
              </div>

              <div className="bg-white absolute left-[25px] top-[125px] text-black text-[18px] font-[400] font-Inter">
                Place the Artwork
              </div>

              <div className="bg-white absolute left-[26px] top-[162px] text-black text-[16px] font-[400] font-Inter">
                <label className="inline-flex items-center bg-white">
                  <input
                    type="radio"
                    name="place"
                    onChange={handleChange}
                    checked={inputs.place === "bidding"}
                    value="bidding"
                    disabled // Disable the Bidding option
                    className="mr-2"
                  />
                  Bidding
                </label>
              </div>

              {inputs.place === "bidding" && (
                <div className="relative">
                  <div className="bg-white absolute left-[26px] top-[200px] text-black text-[18px] font-[400] font-Inter">
                    Starting BID Price
                  </div>
                  <div className="absolute w-[300px] h-[48px] left-[26px] top-[230px] flex items-center border border-black rounded-[15px]">
                    <span className="pl-4">Rs.</span>
                    <input
                      type="text"
                      name="price"
                      onChange={handleChange}
                      value={inputs.price}
                      disabled // Disable the bid price input field
                      placeholder="Enter the starting bid price"
                      className="pl-2 w-full h-full border-none outline-none bg-white rounded-[15px]"
                    />
                  </div>
                </div>
              )}

              <div className="bg-white absolute left-[340px] top-[162px] text-black text-[16px] font-[400] font-Inter">
                <label className="bg-white">
                  <input
                    type="radio"
                    name="place"
                    onChange={handleChange}
                    checked={inputs.place === "promote"}
                    value="promote"
                    disabled // Disable the Promote option
                    className="mr-2"
                  />
                  Promote
                </label>
              </div>

              <h6 className="absolute mt-1 text-sm text-red-500 bg-white left-5 top-44">
                Cannot change the place of the artwork
              </h6>

              <div>
                <div className="bg-white absolute left-[25px] top-[286px] text-black text-[18px] font-[400] font-Inter">
                  Image Tags
                </div>
                <div className="bg-white absolute left-[25px] top-[320px] flex space-x-2">
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
                  className="bg-white absolute w-[470px] h-[48px] left-[25px] top-[360px] border border-black rounded-[15px] px-4"
                />
              </div>

              <Button
                className="absolute left-[20px] top-[470px]"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button
                className="absolute left-[433px] top-[470px]"
                type="submit"
              >
                Submit
              </Button>
            </div>
          )}
        </form>
      </div>
      <FooterComp />
    </div>
  );
}

export default UpdateArtwork;
