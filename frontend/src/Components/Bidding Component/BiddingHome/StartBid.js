import React from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

function StartBid() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative z-10">
      <NavigationBar/>
      </div>
      
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
    <FooterComp/>
    </div>
  );
}

export default StartBid;
