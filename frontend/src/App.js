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
import InquiryComp from "./Components/Inquiry Component/InquiryComp";
import SellArtComp from "./Components/Artwork Component/SellArtComp";
import NewsFeedComp from "./Components/Main Component/NewsFeedComp";
import ContactUsComp from "./Components/Main Component/ContactUsComp";
import ArtworksComp from "./Components/Artwork Component/ArtworkDetails/ArtworksComp";
<<<<<<< HEAD

//Inventory-MAYOMI
import InventoryComp from "./Components/Inventory Component/InventoryDetails/InventoryComp";
import Addinventory from "./Components/Inventory Component/InventoryDetails/Addinventory";
import AdminUi from "./Components/Inventory Component/Inventory/AdminUi";
import UpdateInventory from "./Components/Inventory Component/InventoryDetails/UpdateInventory";
import Shopview from "./Components/Inventory Component/Shop/ShopView";
=======
import AddArtworkComp from "./Components/Artwork Component/AddArtwork/AddArtworkComp";
import UpdateArtwork from "./Components/Artwork Component/UpdateArtwork/UpdateArtwork";

//Inventory Manager
import InventoryComp from "./Components/Inventory Component/InventoryDetails/InventoryComp";
import Addinventory from "./Components/Inventory Component/InventoryDetails/Addinventory";
import AdminUi from "./Components/Inventory Component/Inventory/AdminUi";
import UpdateInventory from "./Components/Inventory Component/Inventory/InventoryUpdate/UpdateInventory";
>>>>>>> c8bd906e6040495364200c0c9beee050ec5e549a

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainHome" element={<Home />} />
<<<<<<< HEAD
          <Route path="/mainGallery" element={<GalleryComp />} />
          <Route path="/mainEvents" element={<EventComp />} />
          <Route path="/mainTickets" element={<TicketComp />} />
          <Route path="/mainBidding" element={<BiddingComp />} />
          <Route path="/mainAboutUs" element={<AboutUsComp />} />
          <Route path="/mainBlog" element={<BlogComp />} />
          <Route path="/mainInquary" element={<InquiryComp />} />
          <Route path="/mainSellArt" element={<SellArtComp />} />
          <Route path="/mainNewsFeed" element={<NewsFeedComp />} />
          <Route path="/mainContactUs" element={<ContactUsComp />} />
          <Route path="/mainArtworkDetails" element={<ArtworksComp />} />
=======
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
          <Route path="/mainSellArt" element={<SellArtComp/>} />
          <Route path="/mainNewsFeed" element={<NewsFeedComp/>} />
          <Route path="/mainContactUs" element={<ContactUsComp/>} />
          <Route path="/mainArtworkDetails" element={<ArtworksComp/>} />
          <Route path="/mainAddArtwork" element={<AddArtworkComp/>} />
          
          <Route path="/mainArtworkDetails/:id" element={<UpdateArtwork/>} />

>>>>>>> c8bd906e6040495364200c0c9beee050ec5e549a

          {/* Inventory-MAYOMI */}
          <Route path="/mainInventory" element={<AdminUi />} />
          <Route path="/shopView" element={<Shopview />} />
          <Route path="/addinventoryform" element={<Addinventory />} />
          <Route path="/itemview" element={<InventoryComp />} />
          <Route path="/itemview/:id" element={<UpdateInventory />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
