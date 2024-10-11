import React from 'react';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import one from './Images_Blog/one.jpg';
import two from './Images_Blog/two.jpg';
import three from './Images_Blog/three.png';
import four from './Images_Blog/four.jpg';
import five from './Images_Blog/five.jpg';

function Blog() {
  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>

      <div className="container px-4 py-12 mx-auto ">
        <h1 className="mb-12 text-5xl font-bold text-center text-gray-900">The Journey of Awarna Art Gallery</h1>

        <p className="mb-8 text-xl leading-relaxed text-gray-700">
          At the heart of Wennappuwa, nestled along the serene Parakrama Mawatha, lies Awarna Art Gallery—a beacon 
          of creativity and artistic expression. But the journey of this remarkable space wasn't easy. It all began in early 
          February 2023, when "owner_name" envisioned a sanctuary for local artists and international masterpieces alike. 
          By the end of the year, Awarna Art Gallery would stand as a testament to resilience and passion, housing works 
          that echo the spirit of art itself.
        </p>

        <div className="grid grid-cols-1 gap-12 mb-12 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img src={one} alt="Construction Image 1" className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110" />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img src={two} alt="Construction Image 2" className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110" />
          </div>
        </div>

        <p className="mb-8 text-xl leading-relaxed text-gray-700">
          Construction began in March 2023, when the first brick was laid down in what was previously an overgrown plot of land. 
          For months, dedicated workers toiled day and night under the supervision of "owner_name," who watched the vision 
          take shape. By August 2023, the foundation was fully completed, and the gallery's frame began to rise proudly against 
          the skyline.
        </p>

        <div className="relative mb-12 overflow-hidden rounded-lg shadow-xl group">
          <img src={three} alt="Gallery's Building" className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110" />
        </div>

        <p className="mb-8 text-xl leading-relaxed text-gray-700">
          The exterior construction was completed by early September 2023, and the grand structure of the Awarna Art Gallery 
          began to shine through. By October 2023, the doors were finally opened, marking the official completion of the 
          building. The community stood in awe as the gallery stood tall amidst the peaceful streets of Wennappuwa. 
          Its walls, now home to countless works of art, began to whisper stories of creativity and heritage.
        </p>

        <div className="grid grid-cols-1 gap-12 mb-12 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img src={four} alt="Gallery's Inside 1" className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110" />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl group">
            <img src={five} alt="Gallery's Inside 2" className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110" />
          </div>
        </div>

        <p className="mb-8 text-xl leading-relaxed text-gray-700">
          As the finishing touches were put in place in November 2023, the interior began to take its final shape. The team carefully 
          curated spaces for different art exhibitions, ensuring every piece had its own place to shine. By December 2023, the 
          gallery was fully ready to host its grand opening, an event that would become a milestone in the local art scene.
        </p>

        <p className="mb-8 text-xl leading-relaxed text-gray-700">
          Inside the gallery, visitors are greeted by the soft hum of creativity. From the carefully curated art pieces to the 
          subtle play of natural light, every element was designed to inspire. Each room tells a new story, and each piece 
          brings to life the imagination of the artists who call this place their sanctuary. Awarna Art Gallery has become 
          more than just a gallery—it’s a home for art to flourish, a space where creativity knows no bounds.
        </p>
      </div>

      <FooterComp />
    </div>
  );
}

export default Blog;
