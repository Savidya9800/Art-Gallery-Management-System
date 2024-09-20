import React from "react";
import NavigationBar from "../Nav Component/NavigationBar";
import FooterComp from "../Nav Component/FooterComp";
import "./sellArt.css";
import { Link } from "react-router-dom";

function GalleryComp() {
  return (
    <div>
      <NavigationBar />
      <h1>Gallery</h1>
      <br></br>
      <Link to="/mainArtworkDetails">
        <button type="button" class="btn btn-primary">
          Artwork Details
        </button>
      </Link>
      <br></br>
      <br></br>
      <Link to="/mainAddArtwork">
        <button type="button" class="btn btn-primary">
          Add Artwork
        </button>
      </Link>
      <br></br>
      <br></br>
     

      <FooterComp />
    </div>
  );
}

export default GalleryComp;
