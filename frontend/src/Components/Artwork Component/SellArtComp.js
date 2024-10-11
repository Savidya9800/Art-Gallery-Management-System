import React from "react";
import FooterComp from "../Nav Component/FooterComp";
import NavigationBar from "../Nav Component/NavigationBar";
import AddArtworkComp from "./AddArtwork/AddArtworkComp";
import ExampleCarouselImage from "./Images/img5.jpeg";
import ExampleCarouselImage2 from "./Images/img2.jpg";
import ExampleCarouselImage3 from "./Images/img7.jpeg";
import Carousel from "react-bootstrap/Carousel";

function SellArtComp() {
  return (
    <div>
      <div className="relative z-10 ">
        <NavigationBar />
      </div>
      <div className="mt-0 ml-48 w-96">
        <Carousel>
          <Carousel.Item>
            <img
              className="w-full h-[550px]  object-cover"
              src={ExampleCarouselImage}
              alt="First slide"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="w-full h-[550px] object-cover"
              src={ExampleCarouselImage2}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="w-full h-[550px] object-cover "
              src={ExampleCarouselImage3}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="-mt-[570px] mb-5">
        <AddArtworkComp />
      </div>
      
      <FooterComp />
    </div>
  );
}

export default SellArtComp;
