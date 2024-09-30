import React, { useEffect } from "react";
import NavigationBar from "../Nav Component/NavigationBar";
import FooterComp from "../Nav Component/FooterComp";
import axios from "axios";

const URL = "http://localhost:5000/artWorks";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ArtworkDetailsComp() {
  const [artworks, setArtworks] = React.useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setArtworks(data));
  }, []);

  return (
    <div>
      <NavigationBar />
      <h1>Artist Artwork Details</h1>

      <FooterComp />
    </div>
  );
}

export default ArtworkDetailsComp;
