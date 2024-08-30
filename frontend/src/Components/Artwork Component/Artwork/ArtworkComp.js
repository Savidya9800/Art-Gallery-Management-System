import React from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArtworkComp(props) {
  const { _id, name, email, pNumber } = props.ARTWORK;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/artWorks/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/mainArtworkDetails"));
  };

  return (
    <div>
      <br></br>
      <h1> ID :{_id}</h1>
      <h1> Name :{name}</h1>
      <h1> Email :{email}</h1>
      <h1> Phone :{pNumber}</h1>
      <Link to={`/mainArtworkDetails/${_id}`}>Update</Link>
      <button onClick={deleteHandler}>Delete</button> 
      <br></br>
      <br></br>
    </div>
  );
}

export default ArtworkComp;
