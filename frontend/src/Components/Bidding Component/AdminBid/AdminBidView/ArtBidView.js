import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ArtBidForm from '../AdminBidForm/ArtBidForm'

const URL="http://Localhost:5000/Adminbid"

//take data through fetch handler
const fetchHandler = async() =>{
  return await axios.get(URL).then((res) => res.data);
}

function ArtBidView() {

  const [adminAddBid, setBidAddArt] = useState();

  useEffect(() => {
    fetchHandler().then((data) => setBidAddArt(data.adminAddBid));
  },[])

  const [searchQuery, setSearchQuery] = useState("")
  const [noResults, setNoResults]= useState(false);
//search function
  const handleSearch =() =>{
    fetchHandler().then((data)=>{
      const filteredBidArt = data.adminAddBid.filter((BIDART) =>
      Object.values(BIDART).some((feild)=>
        feild.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ))
      setBidAddArt(filteredBidArt);
      setNoResults(filteredBidArt.length === 0);
    });
  }

  return (
    <div className="p-6">
      <div className="flex items-center bg-[#ECE6F0]  border-gray-300 px-6 py-1.5 shadow-md w-96 mx-auto">
        

      <input type="text" name="search" className="bg-[#ECE6F0] w-full px-4 py-0.1 text-gray-700 focus:outline-none"
       placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)}></input>
       

       
      <button  className="border border-[#A78F51] text-[#A78F51] py-2 px-6 rounded-md shadow-md hover:bg-[#A78F51] hover:text-white transition duration-300"
      onClick={handleSearch}>Search
      </button>
      </div>

      {noResults ? (
        <div className="text-center mt-6">
          <p className="text-red-500">No Bid Art found</p>
        </div>
      ):(
      

      <div className="mt-6">
        {adminAddBid && adminAddBid.map((BIDART,i) =>(
          <div key={i}>

            <ArtBidForm BIDART={BIDART}/>


          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default ArtBidView
