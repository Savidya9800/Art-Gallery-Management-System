import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import { useNavigate } from 'react-router-dom'  // when navigate from the button we need to imoprt this
import FooterComp from '../Nav Component/FooterComp';




function BiddingComp() {

  const navigate = useNavigate();
  
  return (
    <div>
     <div className="relative z-10">
        <NavigationBar />
      </div>
    <div className="flex flex-col items-center justify-center h-screen text-center bg-center bg-cover" style={{ backgroundImage: `url(${require('./img.png')})` }}>
   
    <div className="p-5 bg-gray-200 rounded-lg bg-opacity-60" >
      <h1 className="mb-4 text-4xl text-gray-800 bg-transparent">Experience The Thrill Of Art Auctions</h1>
      <p className="mb-8 text-2xl text-gray-700 bg-transparent">......Where Masterpieces Find Their Home......</p>
      <div className="flex flex-col space-y-4">
      <button className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51]" 
      onClick={() => navigate('/startBidding')}>
        Start Bidding →
      </button>

      <button className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51]" 
      onClick={() => navigate("/adminArtBidAdd")}>Admin Art Bid insert  →</button>
      <button className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51]" 
      onClick={() => navigate("/adminBidView")}>Admin Art Bid view  →</button>
    </div>
  </div>
  </div>
  <FooterComp/>
  </div>
    
  )
}

export default BiddingComp
