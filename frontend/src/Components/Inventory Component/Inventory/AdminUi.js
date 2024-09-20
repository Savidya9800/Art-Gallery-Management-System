import React from 'react'
import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import { useNavigate } from 'react-router-dom';

function AdminUi() {
    
    const Navigate = useNavigate();

  return (
    <div>
        <NavigationBar />
        <div>
      <button className="Adminbutton" onClick={()=>Navigate('/addinventoryform')}>Add item</button><br></br>
      <button className="Adminbutton" onClick={()=>Navigate('/itemview')}>Currunt Inventory</button>
      <br></br>
    </div>
    <FooterComp />
    </div>
  )
}

export default AdminUi
