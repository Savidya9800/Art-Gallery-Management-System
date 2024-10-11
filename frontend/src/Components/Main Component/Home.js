import React, { useState, useEffect, useRef } from 'react';
import img18 from '../Main Component/Images Home/img18.jpg';
import img17 from '../Main Component/Images Home/img17.jpg';
import img14 from '../Main Component/Images Home/img14.jpg';
import img16 from '../Main Component/Images Home/img16.jpg';
import img19 from '../Main Component/Images Home/img19.jpg';
import img20 from '../Main Component/Images Home/img20.jpg';
import img9 from '../Main Component/Images Home/img9.JPG';


import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import Button from 'react-bootstrap/Button';
//import bgImage from '../Main Component/Images Home/background.jpg'; // Add your background image path here

const Carousel = () => {
  const [sliderItems, setSliderItems] = useState([
    { id: 1, imgSrc: img19, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' },
    { id: 2, imgSrc: img20, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' },
    { id: 3, imgSrc: img9, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' },
    //{ id: 4, imgSrc: img22, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const timeRunning = 3000;
  const timeAutoNext = 7000;

  const showSlider = (type) => {
    const totalItems = sliderItems.length;
    if (type === 'next') {
      setCurrentIndex((currentIndex + 1) % totalItems);
    } else {
      setCurrentIndex((currentIndex - 1 + totalItems) % totalItems);
    }
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      showSlider('next');
    }, timeAutoNext);

    return () => clearInterval(autoSlide);
  }, [currentIndex]);

  const carouselStyles = {
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    margin: '0',
    backgroundImage: `url(${img16})`, // Set the background image here
    backgroundSize: 'cover',            // Cover the whole container
    backgroundPosition: 'center',       // Center the image
    backgroundRepeat: 'no-repeat',      // Avoid repeating the image
    backgroundColor: 'transparent',
  };

  const listStyles = {
    position: 'relative',
  };

  const itemStyles = (isActive) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    inset: '0',
    opacity: isActive ? 1 : 0,
    transition: 'opacity 0.5s ease',
  });

  const contentStyles = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '1140px',
    maxWidth: '80%',
    paddingRight: '30%',
    color: 'inherit',
    textShadow: '0 5px 10px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',	
    backgroundColor: 'transparent',
  };

  const thumbnailStyles = {
    position: 'absolute',
    bottom: '50px',
    left: '75%',
    display: 'flex',
    gap: '20px',
    transform: 'translateX(-50%)',
    zIndex: 100,
  };

  const arrowButtonStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(238, 238, 238, 0.25)',
    border: 'none',
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    transition: '0.5s',
  };

  const arrowContainerStyles = {
    position: 'absolute',
    top: '80%',
    right: '52%',
    display: 'flex',
    gap: '10px',
  };

  return (
    <div>
      <div className="carousel" ref={carouselRef} style={carouselStyles}>
        <div className="relative z-10">
          <NavigationBar />
        </div>
        <div className="list" style={listStyles}>
          {sliderItems.map((item, index) => (
            <div
              className={`item ${index === currentIndex ? 'active' : ''}`}
              key={item.id}
              style={itemStyles(index === currentIndex)}
            >
              <img src={item.imgSrc} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="content" style={contentStyles}>
                <div className="author" style={{ fontWeight: 'bold', letterSpacing: '10px',  backgroundColor: 'transparent' }}>{item.author}</div>
                <div className="title" style={{ fontSize: '5em', fontWeight: 'bold', lineHeight: '1.3em', backgroundColor: 'transparent' }}>{item.title}</div>
                <div className="topic" style={{ fontSize: '5em', fontWeight: 'bold',  backgroundColor: 'transparent' }}>{item.topic}</div>
                <div className="des" style={{ marginTop: '10px',  backgroundColor: 'transparent'}}>{item.description}</div>
                <div className="buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px',  backgroundColor: 'transparent' }}>
                  <button style={{ border: 'none', backgroundColor: 'transparent', letterSpacing: '3px', padding: '10px 20px' }}>SEE MORE</button>
                  <Button variant="outline-dark">Explore</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <div className="thumbnail" style={thumbnailStyles}>
          {sliderItems.map((item, index) => (
            <div className={`item ${index === currentIndex ? 'active' : ''}`} key={item.id}>
              <img src={item.imgSrc} alt={item.title} style={{ width: '350px', height: '220px', objectFit: 'cover', borderRadius: '20px' }} />
            </div>
          ))}
        </div>

        <div className="arrows" style={arrowContainerStyles}>
          <button id="prev" onClick={() => showSlider('prev')} style={arrowButtonStyles}>&lt;</button>
          <button id="next" onClick={() => showSlider('next')} style={arrowButtonStyles}>&gt;</button>
        </div>

      </div>
      <FooterComp />
    </div>
  );
};

export default Carousel;
