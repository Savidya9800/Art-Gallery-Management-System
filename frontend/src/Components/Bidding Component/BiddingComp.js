import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
//import FooterComp from '../Nav Component/FooterComp'
import { useNavigate } from 'react-router-dom'  // when navigate from the button we need to imoprt this



function BiddingComp() {

  const navigate = useNavigate();
  
  return (
    <div>
      <NavigationBar/>
    <div className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center" style={{ backgroundImage: `url(${require('./img.png')})` }}>
   
    <div className="bg-gray-200 bg-opacity-60 p-5 rounded-lg" >
      <h1 className="text-4xl text-gray-800 mb-4 bg-transparent">Experience The Thrill Of Art Auctions</h1>
      <p className="text-2xl text-gray-700 mb-8 bg-transparent">......Where Masterpieces Find Their Home......</p>
      <button className="px-5 py-2 text-lg bg-transparent text-[#A78F51] border-2 border-[#A78F51] rounded-md cursor-pointer transition duration-300 hover:text-[#c5b358] hover:border-[#A78F51]" 
      onClick={() => navigate('/startBidding')}>
        Start Bidding →
      </button>

      <button onClick={() => navigate("/adminArtBidAdd")}>Admin Art Bid insert</button>
      <button onClick={() => navigate("/adminBidView")}>Admin Art Bid view</button>
    </div>
  </div>
  </div>
    
  )
}

export default BiddingComp
