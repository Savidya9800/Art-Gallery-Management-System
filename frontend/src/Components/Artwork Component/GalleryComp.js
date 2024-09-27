import React from "react";
import NavigationBar from "../Nav Component/NavigationBar";
import FooterComp from "../Nav Component/FooterComp";
import { Link, useParams } from "react-router-dom";
import ImgUploader from "./ImgUploader/ImgUploader";

function GalleryComp() {
  const { id } = useParams(); // Get the id from the URL parameters

  return (
    <div>
      <NavigationBar />
      <h1>Gallery</h1>
      <br />
      <Link to="/mainArtworkDetails">
        <button type="button" className="btn btn-primary">
          Artwork Details
        </button>
      </Link>
      <br />
      <br />

      <Link to="/mainAdminArtworks">
        <button type="button" className="btn btn-primary">
          Artwork Details - Admin
        </button>
      </Link>

      <br />
      <br />

      {/* Pass the id prop to ImgUploader */}
      <ImgUploader artworkId={id} />

      <FooterComp />
    </div>
  );
}

export default GalleryComp;
