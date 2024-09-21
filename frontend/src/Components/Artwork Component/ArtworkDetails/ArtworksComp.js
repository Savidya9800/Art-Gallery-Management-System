import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import ArtworkComp from "../Artwork/ArtworkComp";

const URL = "http://localhost:5000/artWorks";

// fetchHandler
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
      <h1>Artwork Details</h1>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Place</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artWorks &&
            artWorks.map((ARTWORK, i) => (
              <tr key={i}>
                {/* You can use ArtworkComp to display the details */}
                <ArtworkComp ARTWORK={ARTWORK} />
              </tr>
            ))}
        </tbody>
      </table>
      <FooterComp />
    </div>
  );
}

export default ArtworksComp;
