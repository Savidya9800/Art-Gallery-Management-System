import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import img18 from '../Main Component/Images Home/img18.jpg'
import img17 from '../Main Component/Images Home/img17.jpg'
import img14 from '../Main Component/Images Home/img14.jpg'
import img16 from '../Main Component/Images Home/img16.jpg'
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import Button from 'react-bootstrap/Button';

const Carousel = () => {
  const [sliderItems, setSliderItems] = useState([
    { id: 1, imgSrc: img16, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' },
    { id: 2, imgSrc: img14, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' },
    { id: 3, imgSrc: img18, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' },
    { id: 4, imgSrc: img17, author: 'AWARNA', title: 'ART IS THE', topic: 'THE FUTURE OF CREATIVITY', description: 'Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that has nothing to do with acquisition.' }
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

  return (
    <div>

    <div className="carousel" ref={carouselRef}>
    <div className="relative z-10">
      <NavigationBar />
      </div>
      <div className="list">
        {sliderItems.map((item, index) => (
          <div className={`item ${index === currentIndex ? 'active' : ''}`} key={item.id}>
            <img src={item.imgSrc} alt={item.title} />
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <Button variant="outline-dark">Explore</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br/>

      <div className="thumbnail">
        {sliderItems.map((item, index) => (
          <div className={`item ${index === currentIndex ? 'active' : ''}`} key={item.id}>
            <img src={item.imgSrc} alt={item.title} />
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={() => showSlider('prev')}>&lt;</button>
        <button id="next" onClick={() => showSlider('next')}>&gt;</button>
      </div>

      <div className="time" style={{ width: `${((timeRunning / timeAutoNext) * 100)}%` }}></div>
    </div>
    <FooterComp/>
    </div>
  );
};

export default Carousel;
