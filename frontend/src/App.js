import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import Home from "./Components/Main Component/Home";
import GalleryComp from "./Components/Artwork Component/GalleryComp";
import EventComp from "./Components/Event Component/EventComp";
import TicketComp from "./Components/Ticketing Component/TicketComp";
import BiddingComp from "./Components/Bidding Component/BiddingComp";
import AboutUsComp from "./Components/Main Component/AboutUsComp";
import BlogComp from "./Components/Main Component/BlogComp";

//Inquiry imports
import InquiryComp from "./Components/Inquiry Component/InquiryComp";
import AddInquiry from "./Components/Inquiry Component/AddInquiry/AddInquiry";
import ViewInquiry from "./Components/Inquiry Component/ViewInquiry/ViewInquiry";
import UpdateInquiry from "./Components/Inquiry Component/UpdateInquiry/UpdateInquiry"; 


import SellArtComp from "./Components/Artwork Component/SellArtComp";
import NewsFeedComp from "./Components/Main Component/NewsFeedComp";
import ContactUsComp from "./Components/Main Component/ContactUsComp";
import ArtworksComp from "./Components/Artwork Component/ArtworkDetails/ArtworksComp";
import AddArtworkComp from "./Components/Artwork Component/AddArtwork/AddArtworkComp";
import UpdateArtwork from "./Components/Artwork Component/UpdateArtwork/UpdateArtwork";

//Inventory Manager
import InventoryComp from "./Components/Inventory Component/InventoryDetails/InventoryComp";
import Addinventory from "./Components/Inventory Component/InventoryDetails/Addinventory";
import AdminUi from "./Components/Inventory Component/Inventory/AdminUi";
import UpdateInventory from "./Components/Inventory Component/Inventory/InventoryUpdate/UpdateInventory";

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

        
          <Route path="/mainInventory" element={<AdminUi/>} />
          <Route path="/addinventoryform" element={<Addinventory/>} />
          <Route path="/itemview" element={<InventoryComp/>} />
          <Route path="/itemview/:id" element={<UpdateInventory/>} />



          <Route path="/mainBidding" element={<BiddingComp/>} />
          

          <Route path="/mainAboutUs" element={<AboutUsComp/>} />
          <Route path="/mainBlog" element={<BlogComp/>} />

          <Route path="/mainInquary" element={<InquiryComp/>} />
          <Route path="/newInquiry" element={<AddInquiry />} />
          <Route path="/inquiries" element={<ViewInquiry />} />
          <Route path="/updateInquiry/:id" element={<UpdateInquiry />} />

          <Route path="/mainSellArt" element={<SellArtComp/>} />
          <Route path="/mainNewsFeed" element={<NewsFeedComp/>} />
          <Route path="/mainContactUs" element={<ContactUsComp/>} />
          <Route path="/mainArtworkDetails" element={<ArtworksComp/>} />
          <Route path="/mainAddArtwork" element={<AddArtworkComp/>} />
          
          <Route path="/mainArtworkDetails/:id" element={<UpdateArtwork/>} />


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
