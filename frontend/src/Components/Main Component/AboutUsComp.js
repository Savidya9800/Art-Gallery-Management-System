import React, { useState } from 'react';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import one from './Images AboutUs/img1.jpeg'; // Replace with actual image paths
import two from './Images AboutUs/img2.jpeg';
import three from './Images AboutUs/img3.jpg';
import four from './Images AboutUs/img4.jpg';
import five from './Images AboutUs/img5.jpeg';
import six from './Images AboutUs/img6.jpeg';

function AboutUsComp() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setPopupImage(imageSrc);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <div className="relative z-10">
        <NavigationBar />
      </div>

      {/* About Us Section */}
      <div className="container flex-grow px-4 py-12 mx-auto bg-gray-100">
        <h1 className="mb-12 text-5xl font-bold text-center text-gray-900 bg-gray-100">AWARNA Art Gallery</h1>

        <p className="mb-8 text-xl leading-relaxed text-center text-gray-700 bg-gray-100">
          AWARNA Art Gallery stands as a sanctuary for creativity, nestled in the serene streets of Wennappuwa. Founded in 2023, 
          the gallery was born out of a vision to provide a space where local and international art could flourish. Over the past 
          year, AWARNA has become a hub of artistic expression, housing events, exhibitions, and training programs designed to 
          nurture both emerging and established artists.
        </p>

        <p className="mb-8 text-xl leading-relaxed text-center text-gray-700 bg-gray-100">
          Our mission is simple: to celebrate creativity in all its forms. We believe in the power of art to connect, inspire, and 
          transform the world around us.
        </p>

        {/* Image Grid with Four Images in One Row */}
        <div className="grid grid-cols-1 gap-8 mb-12 bg-gray-100 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img 
              src={one} 
              alt="AWARNA Art Gallery Exterior" 
              className="object-cover w-full h-full transition-transform duration-500 transform cursor-pointer group-hover:scale-110" 
              onClick={() => handleImageClick(one)}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img 
              src={two} 
              alt="AWARNA Art Gallery Interior" 
              className="object-cover w-full h-full transition-transform duration-500 transform cursor-pointer group-hover:scale-110" 
              onClick={() => handleImageClick(two)}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img 
              src={three} 
              alt="Gallery's Grand Opening" 
              className="object-cover w-full h-full transition-transform duration-500 transform cursor-pointer group-hover:scale-110" 
              onClick={() => handleImageClick(three)}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img 
              src={four} 
              alt="Art Exhibition" 
              className="object-cover w-full h-full transition-transform duration-500 transform cursor-pointer group-hover:scale-110" 
              onClick={() => handleImageClick(four)}
            />
          </div>
        </div>

       {/* Our Journey Section */}
<div className="mb-12 text-center bg-gray-100">
  <h2 className="mb-4 text-3xl font-bold text-gray-900 bg-gray-100">Our Journey</h2>
  <p className="text-xl leading-relaxed text-gray-700 bg-gray-100">
    Since its inception in 2023, AWARNA Art Gallery has been on a path of artistic discovery. We began as a humble space for local 
    artists, but through passion and dedication, we've grown into a prominent destination for both local and international art lovers. 
    Our journey is about fostering creativity and embracing the transformative power of art.
  </p>
</div>

{/* Our Impact Section */}
<div className="mb-12 text-center bg-gray-100">
  <h2 className="mb-4 text-3xl font-bold text-gray-900 bg-gray-100">Our Impact</h2>
  <p className="text-xl leading-relaxed text-gray-700 bg-gray-100">
    Over the past year, AWARNA has become a beacon for art in the community, hosting over 20 exhibitions and launching initiatives 
    to mentor and support budding artists. We've created a space where art isn't just displayed, but celebrated, igniting creativity 
    and forging connections between artists and the public.
  </p>
</div>


        {/* Two Images (Fifth and Sixth Image in Parallel) */}
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img 
              src={five} 
              alt="Another Art Exhibition" 
              className="object-cover w-full h-full transition-transform duration-500 transform cursor-pointer group-hover:scale-110" 
              onClick={() => handleImageClick(five)}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img 
              src={six} 
              alt="Another Art Exhibition 2" 
              className="object-cover w-full h-full transition-transform duration-500 transform cursor-pointer group-hover:scale-110" 
              onClick={() => handleImageClick(six)}
            />
          </div>
        </div>
        
      </div>

      {/* Popup Animation */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-75" onClick={closePopup}>
          <div className="relative">
            <img 
              src={popupImage} 
              alt="Popup" 
              className="object-cover w-full h-auto max-w-lg transition-transform duration-500 transform scale-100 rounded-lg shadow-lg hover:scale-110"
            />
            <button 
              className="absolute p-2 text-black bg-white rounded-full top-2 right-2"
              onClick={closePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <FooterComp />
    </div>
  );
}

export default AboutUsComp;
