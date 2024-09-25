import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'
import { useNavigate } from 'react-router-dom';



function InquiryComp() {

  const Navigate = useNavigate();

  return (
    <div>
      <NavigationBar/>
      
          <div className='flex justify-center space-x-4 mt-8'>
            <button className="inquiry-button px-6 py-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-md transition-all duration-300" onClick={() => Navigate('/newInquiry')}>Add Inquiry </button>

            <button className="inquiry-button px-6 py-3 border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-md transition-all duration-300" onClick={() => Navigate('/inquiries')}>Current Inquiries </button>
    </div>

    <FooterComp/>
    </div>
    
  );
}

export default InquiryComp;


