import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import img1 from './logo.JPG';

function FooterComp() {
  return (
    <footer>
      <img className="logo2" src={img1} alt="logo" />
      <div className="footerContainer">         
        <div className="socialIcons">
          <a href="#" aria-label="Facebook">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" aria-label="Google Plus">
            <i className="fa-brands fa-google-plus"></i>
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className="footerNav">
          <ul>
            <li className="footerLinkMain">
              <Link to="/mainHome" className="footerLink">
                Home
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainGallery" className="footerLink">
                Gallery
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainEvents" className="footerLink">
                Events
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainTickets" className="footerLink">
                Tickets
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainShop" className="footerLink">
                Shop
              </Link>
            </li>
          </ul>          
        </div>          
      </div>        
      <div className="footerBottom">
        <p className="bg-black">
          Copyright &copy; 2024; Designed by{" "}
          <span className="designer">ITP24R_B1_W08 Group</span>
        </p>
      </div>
    </footer>
  );
}

export default FooterComp;
