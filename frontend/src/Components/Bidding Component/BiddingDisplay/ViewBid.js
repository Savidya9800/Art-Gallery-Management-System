import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import Bids from '../Bid/Bids';
import NavigationBar from '../../Nav Component/NavigationBar';

const URL = "http://localhost:5000/bidding";
//fetch data
const fetchHandler = async () =>
{
    return await axios.get(URL).then((res) => res.data);
}


function ViewBid() {

    const [Bidder, setBidder] = useState(); //use state  //here Bidder is what is in your backend under display
    useEffect(() => {
        fetchHandler().then((data) => setBidder(data.Bidder));
    }, [])

    //search
    const [searchQuery, setSearchQuery] = useState("");
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
      fetchHandler().then((data) =>{
        const filteredBids = data.Bidder.filter((IDBidder) => 
        Object.values(IDBidder).some((feild) =>
        feild.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ))
        setBidder(filteredBids);
        setNoResults(filteredBids.length === 0);
      });
    }



  return (
    <div style={{ backgroundColor: '#eee8dc', minHeight: '100vh' }}>
        <NavigationBar/>

      <div className="flex justify-start mb-5" style={{ marginLeft: '30px' }}>
      
      <input onChange={(e) => setSearchQuery(e.target.value)}
      type="text"
      name="search"
      placeholder="search Bid details" 
      className="w-full p-2 px-3 mr-2 transition duration-300 ease-in-out bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ width: 'auto', flexGrow: 1, maxWidth: '400px' }} >
      </input>

      <button onClick={handleSearch}  className="text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
    style={{ backgroundColor: '#A78F51' }}>Search</button>
      </div>

      {noResults ? (
        <div style={{ fontWeight: 'bold', color: 'black', textAlign: 'left', marginLeft: '30px' }}>No Bids found</div>
      ):(



      <div>

        {Bidder && Bidder.map((bidding, i) => (   //here bidding is just an assumed name
            <div>
            
            <Bids key={i} bidding={bidding}/>  
            </div>

        ))}
      </div>
      )}

    </div>
  )
}

export default ViewBid
//display