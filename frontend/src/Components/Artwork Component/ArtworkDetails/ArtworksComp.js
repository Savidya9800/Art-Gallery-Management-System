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
  const [artWorks, setArtworks] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setArtworks(data.artWorks));
  }, []);

  return (
    <div className="flex-col min-h-screen ">
      <NavigationBar />

      <div className="flex-grow p-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Submission ID</th>
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Medium</th>
              <th className="p-2 border border-gray-300">Bidding</th>
              <th className="p-2 border border-gray-300">Promote</th>
              <th className="p-2 border border-gray-300">Description</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artWorks.map((ARTWORK, i) => (
              <tr key={i} className="hover:bg-gray-100">
                <ArtworkComp ARTWORK={ARTWORK} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FooterComp />
    </div>
  );
}

export default ArtworksComp;
