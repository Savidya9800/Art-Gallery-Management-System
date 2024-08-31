import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'
import { useNavigate } from 'react-router-dom';



function InquiryComp() {

  const Navigate = useNavigate();

  return (
    <div>
      <NavigationBar/>
      
          <div>
            <button className="inquiry-button" onClick={() => Navigate('/newInquiry')}>Add Inquiry </button>
            
            <button className="inquiry-button" onClick={() => Navigate('/inquiries')}>Current Inquiries </button>
    </div>

    <FooterComp/>
    </div>
    
  );
}

export default InquiryComp;


