import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import img1 from "./logo.JPG";

function FooterComp() {
  return (
    <footer>
      <Link to="/mainHome">
        <img className="logo2" src={img1} alt="logo" />
      </Link>
      <div className="footerContainer">
        <div className="socialIcons">
          <a href="https://www.facebook.com/profile.php?id=100094546082676&mibextid=LQQJ4d" aria-label="Facebook"  target="_blank" >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/" aria-label="Instagram"  target="_blank" >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://twitter.com/" aria-label="Twitter"  target="_blank" >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://support.google.com/" aria-label="Google Plus"  target="_blank" >
            <i className="fa-brands fa-google-plus"></i>
          </a>
          <a href="https://www.youtube.com/" aria-label="YouTube"  target="_blank" >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
        <div className="footerNav">
          <ul>
            <li className="footerLinkMain">
              <Link to="/mainAboutUs" className="footerLink">
                About Us
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainContactUs" className="footerLink">
                Contact Us
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainPrivacyPolicy" className="footerLink">
                Privacy Policy
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainInquary" className="footerLink">
                FAQ
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/mainBlog" className="footerLink">
                Blog
              </Link>
            </li>
            <li className="footerLinkMain">
              <Link to="/#" className="footerLink">
                Help & Artist
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
