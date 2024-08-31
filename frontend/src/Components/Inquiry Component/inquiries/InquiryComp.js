import React from 'react'
import NavigationBar from '../../Nav Component/NavigationBar'
import FooterComp from '../../Nav Component/FooterComp'
import './inquirymain.css'
 
function InquiryComp() {
  return (
    <div>
      <NavigationBar/>
      <div className="inquiry-page">
        <div className="content">
          <div className="inquiry-buttons">
            <button className="inquiry-button">Add Inquiry &rarr;</button>
            
            <button className="inquiry-button">Current Inquiries &rarr;</button>
          </div>
          <div className="image">
            <img src="/path/to/art-gallery-image.jpg" alt="Art Gallery" />
          </div>
        </div>
      </div>
      
    
      <FooterComp/>
      
      
    </div>
    
  )
}

export default InquiryComp;
