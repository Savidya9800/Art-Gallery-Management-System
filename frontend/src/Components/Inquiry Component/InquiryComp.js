import React from 'react';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import { useNavigate } from 'react-router-dom';

function InquiryComp() {

  const Navigate = useNavigate();

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <div 
        className="flex flex-col items-center justify-center h-screen text-center bg-center bg-cover" 
        style={{ backgroundImage: `url(${require('./inquiryimg.jpg')})`, opacity: 0.6, height: '50vh' }}
      >
        {/* Background box around buttons */}
        <div className="flex flex-col p-5 space-y-6 bg-gray-200 rounded-lg bg-opacity-60">
          <button 
            className="px-5 py-2 text-lg text-gray-800 transition duration-300 border-2 border-gray-800 rounded-full cursor-pointer hover:bg-gray-800 hover:text-white" 
            onClick={() => Navigate('/newInquiry')}
          >
            Add Inquiry 
          </button>
          
          <button 
            className="px-5 py-2 text-lg text-gray-800 transition duration-300 border-2 border-gray-800 rounded-full cursor-pointer hover:bg-gray-800 hover:text-white" 
            onClick={() => Navigate('/inquiries')}
          >
            Current Inquiries
          </button>
        </div>
      </div>

      <FooterComp />
    </div>
  );
}

export default InquiryComp;
