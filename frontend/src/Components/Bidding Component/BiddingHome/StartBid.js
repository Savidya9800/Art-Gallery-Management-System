import React from "react";
import { useNavigate } from "react-router-dom";


function StartBid() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <button className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51] m-1 w-[150px]" 
      onClick={() => navigate("/mainCreateBid")}>
        Bid
      </button>
      <button
        className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51] m-1 w-[150px]"
        onClick={() => navigate("/mainViewBid")}
      >
        View Status
      </button>

      
    </div>
  );
}

export default StartBid;
