import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from './Images Home/img1.jpg';
import img2 from './Images Home/img2.jpg';
import img3 from './Images Home/img3.jpg';
import img4 from './Images Home/img4.jpg';
import img5 from './Images Home/img5.jpg';
import img6 from './Images Home/img6.jpg';
import img7 from './Images Home/img7.jpg';
import img8 from './Images Home/img8.jpg';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import './Home.css';

function Home() {
  const [index, setIndex] = useState(0);
  const [popupImage, setPopupImage] = useState(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleImageClick = (src) => {
    setPopupImage(src);
  };

  const handleClosePopup = () => {
    setPopupImage(null);
  };

  const AboutGallery = () => {
    return (
      <div className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">ABOUT OUR GALLERY</h2>
          <h3 className="mt-2 text-xl font-semibold text-center text-gray-700">VICTORY ART</h3>

          {/* Content Section */}
          <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Left Text Section */}
            <div className="space-y-10">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">2018: The idea of our gallery</h4>
                <p className="mt-2 text-base text-gray-600">
                  Intending to change outdated stereotypes and build new perceptions, Viktória Pikovská set out to build a platform capable of promoting and managing talents who truly deserve respect and spotlight - so she founded Victory Art in 2018.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900">2023: Home for Central & Eastern European Art</h4>
                <p className="mt-2 text-base text-gray-600">
                  By tailoring our company to the world's fast-paced development, Victory Art makes it trustworthy, flexible, affordable, and possible for every corner of the world to access and discover Central and Eastern European artists, a region that hosts many misunderstood and underrepresented voices and talents.
                </p>
              </div>

              <button className="px-6 py-2 text-gray-900 border border-gray-900 rounded-md bg-gray-50 hover:bg-gray-100">
                Read More
              </button>
            </div>

            {/* Right Image Section */}
            <div className="mt-10 lg:mt-0">
              <img
                className="w-full rounded-lg shadow-lg"
                src={img4}
                alt="Gallery"
                onClick={() => handleImageClick(img4)} // Click to open popup
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CollectionGallery = () => {
    return (
      <div className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Title Section */}
          <h2 className="text-3xl font-extrabold text-center text-gray-900">EXPLORE</h2>
          <h3 className="mt-2 text-xl font-medium text-center text-gray-500">LATEST COLLECTION IN OUR GALLERY</h3>

          {/* Collection Grid */}
          <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* Collection 1 */}
            <div className="text-center">
              <img
                className="object-cover w-full h-64 transition-transform duration-300 rounded-lg shadow-lg cursor-pointer hover:scale-105"
                src={img7}
                alt="Autumn Curation"
                onClick={() => handleImageClick(img7)} // Click to open popup
              />
              <h4 className="mt-4 text-lg font-semibold text-gray-900">AUTUMN CURATION</h4>
              <p className="mt-2 text-gray-600">
                Celebrate the arrival of autumn with us! Our curators have carefully selected a stunning array of autumn-inspired artworks for you. Explore our
                <span className="font-semibold text-gray-800"> Autumn Collection now!</span>
              </p>
              <button className="px-6 py-2 mt-4 text-gray-900 border border-gray-800 rounded-md bg-gray-50 hover:bg-gray-100">
                Explore
              </button>
            </div>

            {/* Collection 2 */}
            <div className="text-center">
              <img
                className="object-cover w-full h-64 transition-transform duration-300 rounded-lg shadow-lg cursor-pointer hover:scale-105"
                src={img8}
                alt="Maják Collection"
                onClick={() => handleImageClick(img8)} // Click to open popup
              />
              <h4 className="mt-4 text-lg font-semibold text-gray-900">MAJÁK COLLECTION</h4>
              <p className="mt-2 text-gray-600">
                Explore the art of talented deaf blind artists. Discover a whole new world of art that's created in a way you've never seen before! For more information, click
                <span className="font-semibold text-blue-600"> here!</span>
              </p>
              <button className="px-6 py-2 mt-4 text-gray-900 border border-gray-800 rounded-md bg-gray-50 hover:bg-gray-100">
                Explore
              </button>
            </div>

            {/* Collection 3 */}
            <div className="text-center">
              <img
                className="object-cover w-full h-64 transition-transform duration-300 rounded-lg shadow-lg cursor-pointer hover:scale-105"
                src={img5}
                alt="Limited Merch Collection"
                onClick={() => handleImageClick(img5)} // Click to open popup
              />
              <h4 className="mt-4 text-lg font-semibold text-gray-900">LIMITED MERCH COLLECTION</h4>
              <p className="mt-2 text-gray-600">
                Victory Art is excited to announce its limited edition merch collection. Explore our collection
                <span className="font-semibold text-blue-600"> here!</span>
              </p>
              <button className="px-6 py-2 mt-4 text-gray-900 border border-gray-800 rounded-md hover:bg-gray-100 bg-gray-50">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <div className="relative z-0">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="object-cover w-full h-96"
              src={img1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="object-cover w-full h-96"
              src={img2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="object-cover w-full h-96"
              src={img3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <AboutGallery />
      <CollectionGallery />
      <FooterComp />

      {/* Popup Image Modal */}
      {popupImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img
              className="rounded-lg shadow-lg"
              src={popupImage}
              alt="Popup"
              onClick={handleClosePopup}
            />
            <button
              className="absolute top-0 right-0 p-2 text-white bg-red-500 rounded-full hover:bg-red-600"
              onClick={handleClosePopup}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
