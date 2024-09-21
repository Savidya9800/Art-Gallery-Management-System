import React from "react";
import FooterComp from "../Nav Component/FooterComp";
import NavigationBar from "../Nav Component/NavigationBar";
import "./sellArt.css";
import AddArtworkComp from "./AddArtwork/AddArtworkComp";
function SellArtComp() {
  return (
    <div>
      <NavigationBar />
      <h1>Sell Art</h1>
      <AddArtworkComp />
      <FooterComp />
    </div>
  );
}

export default SellArtComp;
