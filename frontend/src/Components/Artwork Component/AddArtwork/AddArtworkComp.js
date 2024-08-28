import React, { useState } from "react";
import { useNavigate } from "react-router";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import axios from "axios";

function AddArtworkComp() {
  const history = useNavigate();
  const [inputs, setInpits] = useState({
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
    img: "",
    place: "",
    tags: "",
  });

  const handleChange = (e) => {
    setInpits((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("mainArtworkDetails"));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/artWorks", {
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
      img: String(inputs.img),
      place: String(inputs.place),
      tags: String(inputs.tags),
    });
  };

  return (
    <div>
      <NavigationBar />
      <h1>Add Artwork</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          placeholder="Email"
        />
        <input
          type="number"
          name="pNumber"
          onChange={handleChange}
          value={inputs.pNumber}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="website"
          onChange={handleChange}
          value={inputs.website}
          placeholder="Website"
        />
        <input
          type="text"
          name="biography"
          onChange={handleChange}
          value={inputs.biography}
          placeholder="Biography"
        />
        <input
          type="text"
          name="statement"
          onChange={handleChange}
          value={inputs.statement}
          placeholder="Statement"
        />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputs.title}
          placeholder="Title"
        />
        <input
          type="text"
          name="medium"
          onChange={handleChange}
          value={inputs.medium}
          placeholder="Medium"
        />
        <input
          type="text"
          name="dimensions"
          onChange={handleChange}
          value={inputs.dimensions}
          placeholder="Dimensions"
        />
        <input
          type="text"
          name="date"
          onChange={handleChange}
          value={inputs.date}
          placeholder="Date"
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={inputs.date}
          placeholder="Description"
        />
        <input
          type="text"
          name="img"
          onChange={handleChange}
          value={inputs.img}
          placeholder="Image"
        />
        <input
          type="text"
          name="place"
          onChange={handleChange}
          value={inputs.place}
          placeholder="Place"
        />
        <input
          type="text"
          name="tags"
          onChange={handleChange}
          value={inputs.tags}
          placeholder="Tags"
        />
        <button>Add Artwork</button>
      </form>
      <FooterComp />
    </div>
  );
}

export default AddArtworkComp;
