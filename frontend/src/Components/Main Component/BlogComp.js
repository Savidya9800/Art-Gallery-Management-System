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
    <div className="bg-gray-100">
      <div className="relative z-10">
        <NavigationBar />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">The Journey of Awarna Art Gallery</h1>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          At the heart of Wennappuwa, nestled along the serene Parakrama Mawatha, lies Awarna Art Gallery—a beacon 
          of creativity and artistic expression. But the journey of this remarkable space wasn't easy. It all began in early 
          February 2023, when "owner_name" envisioned a sanctuary for local artists and international masterpieces alike. 
          By the end of the year, Awarna Art Gallery would stand as a testament to resilience and passion, housing works 
          that echo the spirit of art itself.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
          <div className="relative group rounded-lg overflow-hidden shadow-xl">
            <img src={one} alt="Construction Image 1" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="relative group rounded-lg overflow-hidden shadow-xl">
            <img src={two} alt="Construction Image 2" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Construction began in March 2023, when the first brick was laid down in what was previously an overgrown plot of land. 
          For months, dedicated workers toiled day and night under the supervision of "owner_name," who watched the vision 
          take shape. By August 2023, the foundation was fully completed, and the gallery's frame began to rise proudly against 
          the skyline.
        </p>

        <div className="relative group rounded-lg overflow-hidden shadow-xl mb-12">
          <img src={three} alt="Gallery's Building" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
        </div>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          The exterior construction was completed by early September 2023, and the grand structure of the Awarna Art Gallery 
          began to shine through. By October 2023, the doors were finally opened, marking the official completion of the 
          building. The community stood in awe as the gallery stood tall amidst the peaceful streets of Wennappuwa. 
          Its walls, now home to countless works of art, began to whisper stories of creativity and heritage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
          <div className="relative group rounded-lg overflow-hidden shadow-xl">
            <img src={four} alt="Gallery's Inside 1" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="relative group rounded-lg overflow-hidden shadow-xl">
            <img src={five} alt="Gallery's Inside 2" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          As the finishing touches were put in place in November 2023, the interior began to take its final shape. The team carefully 
          curated spaces for different art exhibitions, ensuring every piece had its own place to shine. By December 2023, the 
          gallery was fully ready to host its grand opening, an event that would become a milestone in the local art scene.
        </p>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
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
