import React, { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Visitor from '../Visitor/Visitor';

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

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.visitors) {
        setVisitors(data.visitors);
      }
    });
  }, []);

  return (
    <div>
      <Nav />
      <h1>Visitor details</h1>
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
    </div>
  );
}

export default Visitors;