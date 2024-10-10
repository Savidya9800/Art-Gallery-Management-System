import React from 'react'
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import { useNavigate } from 'react-router-dom';

function AdminUi() {
    
    const Navigate = useNavigate();

  return (
    <div>
        <div className="relative z-10 ">
        <NavigationBar />
      </div>
        <div className="flex justify-center">
        <button  className="bg-[#A78F51] hover:bg-[#8e7b44] text-black font-bold py-2 px-4 rounded
         focus:outline-none focus:shadow-outline"
         onClick={()=>Navigate('/shopView')}>Shop</button><br></br>
    </div><br></br>

        <div className="flex justify-center">
      <button 
      className="bg-[#A78F51] hover:bg-[#8e7b44] text-black font-bold py-2 px-4 rounded 
      focus:outline-none focus:shadow-outline"
       onClick={()=>Navigate('/addinventoryform')}>Add item</button><br></br>
      </div><br></br>
      
       <FooterComp />
    </div>
  )
}

export default AdminUi
