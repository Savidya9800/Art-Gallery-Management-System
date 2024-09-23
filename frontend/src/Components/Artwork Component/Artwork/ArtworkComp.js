import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArtworkComp(props) {
  const { _id, title, category, place, description } = props.ARTWORK;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/artWorks/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/mainArtworkDetails"));
  };

  return (
    <>
      <td>{_id}</td>
      <td>{title}</td>
      <td>{category}</td>
      <td>{place}</td>
      <td>{description}</td>
      <td>
        <Link to={`/mainArtworkDetails/${_id}`}>Update</Link> |
        <button onClick={deleteHandler}>Delete</button>
      </td>
    </>
  );
}

export default ArtworkComp;
