import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

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
        img: String(inputs.img),
        place: String(inputs.place),
        tags: String(inputs.tags),
      })

      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/mainArtworkDetails"));
  };

  return (
    <div>
      <h1>Update Artwork</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={inputs.email}
          placeholder="Email"
          required
        />
        <input
          type="number"
          name="pNumber"
          onChange={handleChange}
          value={inputs.pNumber}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="website"
          onChange={handleChange}
          value={inputs.website}
          placeholder="Website"
          required
        />
        <input
          type="text"
          name="biography"
          onChange={handleChange}
          value={inputs.biography}
          placeholder="Biography"
          required
        />
        <input
          type="text"
          name="statement"
          onChange={handleChange}
          value={inputs.statement}
          placeholder="Statement"
          required
        />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputs.title}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="medium"
          onChange={handleChange}
          value={inputs.medium}
          placeholder="Medium"
          required
        />
        <input
          type="text"
          name="dimensions"
          onChange={handleChange}
          value={inputs.dimensions}
          placeholder="Dimensions"
          required
        />
        <input
          type="text"
          name="date"
          onChange={handleChange}
          value={inputs.date}
          placeholder="Date"
          required
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={inputs.description}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="img"
          onChange={handleChange}
          value={inputs.img}
          placeholder="Image"
          //required
        />
        <input
          type="text"
          name="place"
          onChange={handleChange}
          value={inputs.place}
          placeholder="Place"
          required
        />
        <input
          type="text"
          name="tags"
          onChange={handleChange}
          value={inputs.tags}
          placeholder="Tags"
          required
        />
        <button>Update Artwork</button>
      </form>
    </div>
  );
}

export default UpdateArtwork;
