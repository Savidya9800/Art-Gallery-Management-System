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

      <br />
      <br />

      {/* Pass the id prop to ImgUploader */}
      <ImgUploader artworkId={id} />

      <FooterComp />
    </div>
  );
}

export default GalleryComp;
