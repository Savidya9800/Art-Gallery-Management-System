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
import PrivacyPolicy from "./Components/Main Component/PrivacyPolicy";
import InquiryComp from "./Components/Inquiry Component/InquiryComp";
import SellArtComp from "./Components/Artwork Component/SellArtComp";
import NewsFeedComp from "./Components/Main Component/NewsFeedComp";
import ContactUsComp from "./Components/Main Component/ContactUsComp";

import ArtworksComp from "./Components/Artwork Component/ArtworkDetails/ArtworksComp";
import AddArtworkComp from "./Components/Artwork Component/AddArtwork/AddArtworkComp";
import AddVisitor from "./Components/Ticketing Component/Ticket Visitor Component/AddVisitor/AddVisitor";
import UpdateArtwork from "./Components/Artwork Component/UpdateArtwork/UpdateArtwork";
import UploadImage from "./Components/Artwork Component/AddArtwork/UploadImage";
import UploadReceipt from "./Components/Artwork Component/AddArtwork/UploadReceipt";

//Inventory Manager
import InventoryComp from "./Components/Inventory Component/InventoryDetails/InventoryComp";
import Addinventory from "./Components/Inventory Component/InventoryDetails/Addinventory";
import AdminUi from "./Components/Inventory Component/Inventory/AdminUi";
import UpdateInventory from "./Components/Inventory Component/Inventory/InventoryUpdate/UpdateInventory";
import ShopComp from "./Components/Inventory Component/Inventory/ShopComp";

//Ticket-manager
import Visitor from "./Components/Ticketing Component/Ticket Visitor Component/Visitor/Visitor";
import Visitors from "./Components/Ticketing Component/Ticket Visitor Component/Visitor Details/Visitors";
import UpdateVisitor from "./Components/Ticketing Component/Ticket Visitor Component/UpdateVisitor/UpdateVisitor";
import BookingConfirmation from "./Components/Ticketing Component/Ticket Visitor Component/BookingConfirmation/BookingConfirmation";
import MessageAdmin from "./Components/Ticketing Component/Ticket Issues/MessageAdmin";
import MessageResult from "./Components/Ticketing Component/Ticket Issues/MessageResults";
import Messages from "./Components/Ticketing Component/Ticket Issues/Messages";
import VisitorCount from "./Components/Ticketing Component/Ticket Visitor Component/Visitor/VisitorCount";

//Artwork-manager
import AdminArtworks from "./Components/Artwork Component/ArtworkAdmin/AdminArtworks";

import ArtistLogin from "./Components/Event Component/Artist/ArtistLogin";
import ArtistRegister from "./Components/Event Component/Artist/ArtistRegister";
import RequestEventForm from "./Components/Event Component/Artist/RequestEventForm";
import EventMangerRequest from "./Components/Event Component/EventManager/EventMangerRequest";

import UserSee from "./Components/Event Component/User/UserSee";
import PdfGenerator from "./Components/Event Component/Artist/PdfGenerator";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainHome" element={<Home />} />
          <Route path="/mainGallery" element={<GalleryComp />} />
          <Route path="/mainEvents" element={<EventComp />} />
          <Route path="/mainTickets" element={<TicketComp />} />
          <Route path="/mainPrivacyPolicy" element={<PrivacyPolicy />} />

          <Route path="/mainShop" element={<ShopComp />} />
          <Route path="/mainBidding" element={<BiddingComp />} />
          <Route path="/mainAboutUs" element={<AboutUsComp />} />
          <Route path="/mainBlog" element={<BlogComp />} />
          <Route path="/mainInquary" element={<InquiryComp />} />
          <Route path="/mainSellArt" element={<SellArtComp />} />
          <Route path="/mainNewsFeed" element={<NewsFeedComp />} />
          <Route path="/mainContactUs" element={<ContactUsComp />} />
          <Route path="/mainArtworkDetails" element={<ArtworksComp />} />
          <Route path="/mainAddArtwork" element={<AddArtworkComp />} />
          <Route path="/mainUploadImage" element={<UploadImage />} />
          <Route path="/mainUploadReceipt" element={<UploadReceipt />} />
          <Route path="/mainGallery" element={<GalleryComp />} />
          <Route path="/mainEvents" element={<EventComp />} />
          <Route path="/mainTickets" element={<TicketComp />} />

          <Route path="/mainInventory" element={<AdminUi />} />
          <Route path="/addinventoryform" element={<Addinventory />} />
          <Route path="/itemview" element={<InventoryComp />} />
          <Route path="/itemview/:id" element={<UpdateInventory />} />

          <Route path="/mainBidding" element={<BiddingComp />} />
          <Route path="/mainAboutUs" element={<AboutUsComp />} />
          <Route path="/mainBlog" element={<BlogComp />} />
          <Route path="/mainInquary" element={<InquiryComp />} />
          <Route path="/mainSellArt" element={<SellArtComp />} />
          <Route path="/mainNewsFeed" element={<NewsFeedComp />} />
          <Route path="/mainContactUs" element={<ContactUsComp />} />
          <Route path="/mainArtworkDetails" element={<ArtworksComp />} />
          <Route path="/mainAddArtwork" element={<AddArtworkComp />} />
          <Route path="/mainTicketing" element={<TicketComp />} />
          <Route path="/mainTicketAddVisitor" element={<AddVisitor />} />

          <Route path="/visitor" element={<Visitor />} />
          <Route path="/visitorDetails" element={<Visitors />} />
          <Route path="/addVisitor" element={<AddVisitor />} />
          <Route path="/visitorDetails/:id" element={<UpdateVisitor />} />
          <Route path="/visitorDetails/:id" element={<Visitor />} />
          <Route
            path="/bookingConfirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/messageAdmin" element={<MessageAdmin />} />
          <Route path="/messageResult" element={<MessageResult />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/visitor-count" element={<VisitorCount />} />

          <Route path="/mainArtworkDetails/:id" element={<UpdateArtwork />} />
          <Route
            path="/bookingConfirmation"
            element={<BookingConfirmation />}
          />

          <Route path="/artistLogin" element={<ArtistLogin />} />
          <Route path="/artistRegister" element={<ArtistRegister />} />
          <Route path="/requestEventForm" element={<RequestEventForm />} />
          <Route
            path="/event-manager-request"
            element={<EventMangerRequest />}
          />

          <Route path="/userSee" element={<UserSee />} />
          <Route path="/pdf-generator" element={<PdfGenerator />} />

          {/* Event Manager */}
          <Route path="/event-manager-request" element={<EventMangerRequest />} />
          <Route path="/userSee" element={<UserSee />} />
          <Route path="/pdf-generator" element={<PdfGenerator />} />
          <Route path="/event-manager-request" element={<EventMangerRequest />} />
          <Route path="/artistLogin" element={<ArtistLogin />} />
          <Route path="/artistRegister" element={<ArtistRegister />} />
          <Route path="/requestEventForm" element={<RequestEventForm />} />


        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
