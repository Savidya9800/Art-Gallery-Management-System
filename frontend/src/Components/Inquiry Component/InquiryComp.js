import React from 'react';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import { useNavigate } from 'react-router-dom';

function InquiryComp() {

  const Navigate = useNavigate();

  return (
    <div>
      <NavigationBar />
      <div 
        className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-center" 
        style={{ backgroundImage: `url(${require('./inquiryimg.jpg')})`, opacity: 0.6, height: '50vh' }}
      >
        {/* Background box around buttons */}
        <div className="bg-gray-200 bg-opacity-60 p-5 rounded-lg flex flex-col space-y-6">
          <button 
            className="px-5 py-2 text-lg text-gray-800 border-2 border-gray-800 rounded-full cursor-pointer transition duration-300 hover:bg-gray-800 hover:text-white" 
            onClick={() => Navigate('/newInquiry')}
          >
            Add Inquiry 
          </button>
          
          <button 
            className="px-5 py-2 text-lg text-gray-800 border-2 border-gray-800 rounded-full cursor-pointer transition duration-300 hover:bg-gray-800 hover:text-white" 
            onClick={() => Navigate('/inquiries')}
          >
            Current Inquiries
          </button>

          <button 
            className="px-5 py-2 text-lg text-gray-800 border-2 border-gray-800 rounded-full cursor-pointer transition duration-300 hover:bg-gray-800 hover:text-white" 
            onClick={() => Navigate('/AdminViewresponse')}
          >
            Response
          </button>
        </div>
      </div>

      <FooterComp />
    </div>
  );
}

export default InquiryComp;
