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

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const AboutGallery = () => {
    return (
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">ABOUT OUR GALLERY</h2>
          <h3 className="text-center text-xl font-semibold text-gray-700 mt-2">VICTORY ART</h3>

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

              <button className="px-6 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-100">
                Read More
              </button>
            </div>

            {/* Right Image Section */}
            <div className="mt-10 lg:mt-0">
              <img
                className="w-full rounded-lg shadow-lg"
                src={img4} // You can replace this with the actual image path or use an imported image
                alt="Gallery"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CollectionGallery = () => {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <h2 className="text-center text-3xl font-extrabold text-gray-900">EXPLORE</h2>
          <h3 className="text-center text-xl font-medium text-gray-500 mt-2">LATEST COLLECTION IN OUR GALLERY</h3>
  
          {/* Collection Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Collection 1 */}
            <div className="text-center">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                src= {img7}
                alt="Autumn Curation"
              />
              <h4 className="mt-4 text-lg font-semibold text-gray-900">AUTUMN CURATION</h4>
              <p className="mt-2 text-gray-600">
                Celebrate the arrival of autumn with us! Our curators have carefully selected a stunning array of autumn-inspired artworks for you. Explore our 
                <span className="font-semibold text-gray-800"> Autumn Collection now!</span>
              </p>
              <button className="mt-4 px-6 py-2 border border-gray-800 text-gray-900 rounded-md hover:bg-gray-100">
                Explore
              </button>
            </div>
  
            {/* Collection 2 */}
            <div className="text-center">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                src={img8}
                alt="Maják Collection"
              />
              <h4 className="mt-4 text-lg font-semibold text-gray-900">MAJÁK COLLECTION</h4>
              <p className="mt-2 text-gray-600">
                Explore the art of talented deaf blind artists. Discover a whole new world of art that's created in a way you've never seen before! For more information, click 
                <span className="font-semibold text-blue-600"> here!</span>
              </p>
              <button className="mt-4 px-6 py-2 border border-gray-800 text-gray-900 rounded-md hover:bg-gray-100">
                Explore
              </button>
            </div>
  
            {/* Collection 3 */}
            <div className="text-center">
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg"
                src={img5}
                alt="Limited Merch Collection"
              />
              <h4 className="mt-4 text-lg font-semibold text-gray-900">LIMITED MERCH COLLECTION</h4>
              <p className="mt-2 text-gray-600">
                Victory Art is excited to announce its limited edition merch collection. Explore our collection 
                <span className="font-semibold text-blue-600"> here!</span>
              </p>
              <button className="mt-4 px-6 py-2 border border-gray-800 text-gray-900 rounded-md hover:bg-gray-100">
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
              className="w-full h-96 object-cover"
              src={img1}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-full h-96 object-cover"
              src={img2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-full h-96 object-cover"
              src={img3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <AboutGallery />
      <CollectionGallery />
      <FooterComp />
    </div>
  );
}

export default Home;