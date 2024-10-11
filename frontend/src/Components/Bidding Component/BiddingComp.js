import React from "react";
import NavigationBar from "../Nav Component/NavigationBar";
import { useNavigate } from "react-router-dom"; 
import FooterComp from "../Nav Component/FooterComp";

function BiddingComp() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <div className="relative h-screen flex flex-col items-center justify-center text-center bg-center bg-cover">
        
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat blur-sm"
          style={{ backgroundImage: `url(${require("./bidBack.jpg")})` }}
        ></div>

       
        <div className="relative p-5 bg-gray-200 rounded-lg bg-opacity-20">
          <h1 className="mb-4 text-4xl bg-gradient-to-r from-[#000000] to-[#28282B] bg-clip-text text-transparent">
            Experience The Thrill Of Art Auctions
          </h1>
          <p className="mb-8 text-2xl bg-gradient-to-r from-[#000000] to-[#28282B] bg-clip-text text-transparent">
            ......Where Masterpieces Find Their Home......
          </p>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 w-100 text-lg text-black font-semibold bg-gradient-to-r from-[#FFE998] to-[#57370D] border-none rounded-md cursor-pointer transition duration-300 hover:opacity-90"
              onClick={() => navigate("/startBidding")}
              
            >
              Start Bidding →
            </button>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
}

export default BiddingComp;
