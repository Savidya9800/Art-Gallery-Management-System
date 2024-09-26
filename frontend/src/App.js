import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Main Component/Home";
import GalleryComp from "./Components/Artwork Component/GalleryComp";
import EventComp from "./Components/Event Component/EventComp";
import TicketComp from "./Components/Ticketing Component/TicketComp";
import ShopComp from "./Components/Inventory Component/ShopComp";
import BiddingComp from "./Components/Bidding Component/BiddingComp";
import AboutUsComp from "./Components/Main Component/AboutUsComp";
import BlogComp from "./Components/Main Component/BlogComp";
import InquiryComp from "./Components/Inquiry Component/InquiryComp";
import SellArtComp from "./Components/Artwork Component/SellArtComp";
import NewsFeedComp from "./Components/Main Component/NewsFeedComp";
import ContactUsComp from "./Components/Main Component/ContactUsComp";

//User Manager
import AdminUsers from "./Components/User Component/AdminUsers/AdminUsers";
import Login from "./Components/User Component/Login/Login";
import CreaetProfile from "./Components/User Component/CreateProfile/CreaetProfile";
import Profile from "./Components/User Component/Profile/Profile";
import AdminDashboard from "./Components/User Component/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainHome" element={<Home />} />
          <Route path="/mainGallery" element={<GalleryComp />} />
          <Route path="/mainEvents" element={<EventComp />} />
          <Route path="/mainTickets" element={<TicketComp />} />
          <Route path="/mainShop" element={<ShopComp />} />
          <Route path="/mainBidding" element={<BiddingComp />} />
          <Route path="/mainAboutUs" element={<AboutUsComp />} />
          <Route path="/mainBlog" element={<BlogComp />} />
          <Route path="/mainInquary" element={<InquiryComp />} />
          <Route path="/mainSellArt" element={<SellArtComp />} />
          <Route path="/mainNewsFeed" element={<NewsFeedComp />} />
          <Route path="/mainContactUs" element={<ContactUsComp />} />

          {/* User manager */}
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreaetProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
