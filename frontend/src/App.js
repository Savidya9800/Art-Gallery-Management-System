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

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainHome" element={<Home />} />
          <Route path="/mainGallery" element={<GalleryComp/>} />
          <Route path="/mainEvents" element={<EventComp/>} />
          <Route path="/mainTickets" element={<TicketComp/>} />
          <Route path="/mainShop" element={<ShopComp/>} />
          <Route path="/mainBidding" element={<BiddingComp/>} />
          <Route path="/mainAboutUs" element={<AboutUsComp/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
