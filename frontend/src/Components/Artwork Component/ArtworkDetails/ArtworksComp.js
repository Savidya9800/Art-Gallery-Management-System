import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import ArtworkComp from "../Artwork/ArtworkComp";

const URL = "http://localhost:5000/artWorks";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ArtworksComp() {
  const [artWorks, setArtworks] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setArtworks(data.artWorks));
  }, []);

  return (
    <div>
      <NavigationBar />
      <h1>Art work Details</h1>
      <div>
        {artWorks &&
          artWorks.map((ARTWORK, i) => (
            <div>
              <ArtworkComp key={i} ARTWORK={ARTWORK} />
            </div>
          ))}
      </div>
      <FooterComp />
    </div>
  );
}

export default ArtworksComp;
