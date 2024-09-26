import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Visitor from '../Visitor/Visitor';
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';

const URL = 'http://localhost:5000/visitors'; // Corrected URL

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return null;
  }
}

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.visitors) {
        setVisitors(data.visitors);
      }
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredVisitors = data.visitors.filter((visitor) =>
        Object.values(visitor).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setVisitors(filteredVisitors);
      setNoResult(filteredVisitors.length === 0);
    });
  };

  return (
    <div>
      <NavigationBar />
      <br></br>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Users Details"
        className=" ml-10 border rounded-md py-3 px-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <button
        onClick={handleSearch}
        className="ml-5 bg-[#A78F51] text-white font-semibold py-3 px-8 rounded-md"
      >
        {" "}
        Search
      </button>

      {noResult ? (
        <div>
          <p>No result found</p>
        </div>
      ) : (
        <div>
          {visitors.length > 0 ? (
            visitors.map((visitor, i) => (
              <div key={i}>
                <Visitor visitor={visitor} />
              </div>
            ))
          ) : (
            <p>No visitors available.</p>
          )}
        </div>
      )}
      <FooterComp />
    </div>
  );
}

export default Visitors;
