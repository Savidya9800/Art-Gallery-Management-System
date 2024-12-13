import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { CartProvider } from "../../frontend/src/Components/Inventory Component/Shop/CartContext";

//Main Components
import Home from "./Components/Main Component/Home";
import GalleryComp from "./Components/Artwork Component/GalleryComp";
import EventComp from "./Components/Event Component/EventComp";
import TicketComp from "./Components/Ticketing Component/TicketComp";
import BiddingComp from "./Components/Bidding Component/BiddingComp";
import AboutUsComp from "./Components/Main Component/AboutUsComp";
import BlogComp from "./Components/Main Component/BlogComp";
import PrivacyPolicy from "./Components/Main Component/PrivacyPolicy";

//Inquiry imports
import InquiryComp from "./Components/Inquiry Component/InquiryComp";
import AddInquiry from "./Components/Inquiry Component/AddInquiry/AddInquiry";
import ViewInquiry from "./Components/Inquiry Component/ViewInquiry/ViewInquiry";
import UpdateInquiry from "./Components/Inquiry Component/UpdateInquiry/UpdateInquiry";
import UserReadResponse from "./Components/Inquiry Component/UserReadresponse/userReadResponse";

//Inquiry Admin imports
import ViewResponse from "./Components/Inquiry Component/Inquiry admin/ViewResponse";
import Addresponse from "./Components/Inquiry Component/Inquiry admin/Addresponse";
import Updateresponse from "./Components/Inquiry Component/Inquiry admin/Updateresponse";
import AdminInquiryPage from "./Components/Inquiry Component/Inquiry admin//adminreadinquiry/AdminInquiryPage";
import SellArtComp from "./Components/Artwork Component/SellArtComp";
import NewsFeedComp from "./Components/Main Component/NewsFeedComp";
import ContactUsComp from "./Components/Main Component/ContactUsComp";

//Bidding user imports are here
import ViewBid from "./Components/Bidding Component/BiddingDisplay/ViewBid";
import StartBid from "./Components/Bidding Component/BiddingHome/StartBid";
import CreateBid from "./Components/Bidding Component/BiddingAdd/CreateBid";
import BidUpdate from "./Components/Bidding Component/UpdateBid/BidUpdate";
import ArtworksBid from "./Components/Bidding Component/AdminBid/AdminBidView/ArtworksBid";

//Bidding Admin imports are here
import ArtBidAdd from "./Components/Bidding Component/AdminBid/AdminBidAdd/ArtBidAdd";
import ArtBidView from "./Components/Bidding Component/AdminBid/AdminBidView/ArtBidView";
import ArtBidUpdate from "./Components/Bidding Component/AdminBid/AdminBidUpdate/ArtBidUpdate";

//Artwork-manager
import ArtworksComp from "./Components/Artwork Component/ArtworkDetails/ArtworksComp";
import AddArtworkComp from "./Components/Artwork Component/AddArtwork/AddArtworkComp";
import UpdateArtwork from "./Components/Artwork Component/UpdateArtwork/UpdateArtwork";
import UploadImage from "./Components/Artwork Component/AddArtwork/UploadImage";
import SendPdf from "./Components/Artwork Component/AddArtwork/SendPdf";
import AdminArtworks from "./Components/Artwork Component/ArtworkAdmin/AdminArtworks";

//Ticket-manager
import Visitor from "./Components/Ticketing Component/Ticket Visitor Component/Visitor/Visitor";
import Visitors from "./Components/Ticketing Component/Ticket Visitor Component/Visitor Details/Visitors";
import UpdateVisitor from "./Components/Ticketing Component/Ticket Visitor Component/UpdateVisitor/UpdateVisitor";
import BookingConfirmation from "./Components/Ticketing Component/Ticket Visitor Component/BookingConfirmation/BookingConfirmation";
import MessageAdmin from "./Components/Ticketing Component/Ticket Issues/MessageAdmin";
import MessageResult from "./Components/Ticketing Component/Ticket Issues/MessageResults";
import Messages from "./Components/Ticketing Component/Ticket Issues/Messages";
import VisitorCount from "./Components/Ticketing Component/Ticket Visitor Component/Visitor/VisitorCount";
import ShopComp from "./Components/Inventory Component/Inventory/ShopComp";
import AddVisitor from "./Components/Ticketing Component/Ticket Visitor Component/AddVisitor/AddVisitor";

//Event-manager
import ArtistLogin from "./Components/Event Component/Artist/ArtistLogin";
import ArtistRegister from "./Components/Event Component/Artist/ArtistRegister";
import RequestEventForm from "./Components/Event Component/Artist/RequestEventForm";
import EventMangerRequest from "./Components/Event Component/EventManager/EventMangerRequest";
import UserSee from "./Components/Event Component/User/UserSee";
import PdfGenerator from "./Components/Event Component/Artist/PdfGenerator";

//User Manager
import AdminUsers from "./Components/User Component/AdminUsers/AdminUsers";
import Login from "./Components/User Component/Login/Login";
import CreaetProfile from "./Components/User Component/CreateProfile/CreaetProfile";
import Profile from "./Components/User Component/Profile/Profile";
import AdminDashboard from "./Components/User Component/AdminDashboard/AdminDashboard";
import CreateMembership from "./Components/User Component/membership/CreateMembership";
import AllMembership from "./Components/User Component/membership/AllMembership";
import EditMembership from "./Components/User Component/AdminMemberships/EditMembership";
import AdminMemberships from "./Components/User Component/AdminMemberships/AdminMemberships";

//Finance Manager
import PaymentGateway from "./Components/Finance Component/PaymentGateway/Payment";
import Payments from "./Components/Finance Component/PaymentGateway/PaymentDetails";
import Transactions from "./Components/Finance Component/TransactionDetails/Transaction";

//Inventory Manager
import AdminUi from "./Components/Inventory Component/Inventory/AdminUi";
import AddInventory from "./Components/Inventory Component/InventoryDetails/Addinventory";
import InventoryComp from "./Components/Inventory Component/InventoryDetails/InventoryComp";
import UpdateInventory from "./Components/Inventory Component/InventoryDetails/UpdateInventory";
import ShopView from "./Components/Inventory Component/Shop/ShopView";
import CartPage from "./Components/Inventory Component/Shop/CartPage";

function App() {
  return (
    <CartProvider>
      <div>
        <React.Fragment>
          <Routes>
            {/* Main Components */}
            <Route path="/" element={<Home />} />
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
            <Route path="/mainPrivacyPolicy" element={<PrivacyPolicy />} />

            {/* Artwork-manager */}
            <Route path="/mainArtworkDetails" element={<ArtworksComp />} />
            <Route path="/mainAddArtwork" element={<AddArtworkComp />} />
            <Route path="/mainUploadImage" element={<UploadImage />} />
            <Route path="/mainUploadReceipt" element={<SendPdf />} />
            <Route path="/mainArtworkDetails/:id" element={<UpdateArtwork />} />
            <Route path="/mainGallery" element={<GalleryComp />} />
            <Route path="/mainArtworkDetails/:id" element={<UpdateArtwork />} />
            <Route path="/mainAdminArtworks" element={<AdminArtworks />} />

            {/* Inventory Manager */}
            <Route path="/mainInventory" element={<AdminUi />} />
            <Route path="/addinventoryform" element={<AddInventory />} />
            <Route path="/itemview" element={<InventoryComp />} />
            <Route path="/itemview/:id" element={<UpdateInventory />} />
            <Route path="/shopView" element={<ShopView />} />
            {/* Cart */}
            <Route path="/cart" element={<CartPage />} />

            {/* Ticket-manager */}
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

            {/* Inquiry Manager */}
            <Route path="/mainInquary" element={<InquiryComp />} />
            <Route path="/newInquiry" element={<AddInquiry />} />
            <Route path="/inquiries" element={<ViewInquiry />} />
            <Route path="/updateInquiry/:id" element={<UpdateInquiry />} />
            <Route path="/userReadResponse" element={<UserReadResponse />} />
            <Route path="/AdminViewresponse" element={<AdminInquiryPage />} />
            <Route path="/Viewresponse/:id" element={<ViewResponse />} />
            <Route path="/Addresponse/:id" element={<Addresponse />} />
            <Route
              path="/updateresponse/:id/:inquiryID"
              element={<Updateresponse />}
            />

            {/* Event Manager */}
            <Route
              path="/event-manager-request"
              element={<EventMangerRequest />}
            />
            <Route path="/userSee" element={<UserSee />} />
            <Route path="/pdf-generator" element={<PdfGenerator />} />
            <Route
              path="/event-manager-request"
              element={<EventMangerRequest />}
            />
            <Route path="/artistLogin" element={<ArtistLogin />} />
            <Route path="/artistRegister" element={<ArtistRegister />} />
            <Route path="/requestEventForm" element={<RequestEventForm />} />

            {/* Bidding Manager */}

            <Route path="/mainBidding" element={<BiddingComp />} />
            <Route path="/mainViewBid/:id" element={<ViewBid />} />
            <Route path="/startBidding" element={<StartBid />} />
            <Route path="/mainCreateBid/:id" element={<CreateBid />} />
            <Route
              path="/mainUpdateBid/:id/:artworkId"
              element={<BidUpdate />}
            />
            <Route path="/adminArtBidAdd" element={<ArtBidAdd />} />
            <Route path="/adminBidView" element={<ArtBidView />} />
            <Route path="/adminBidView/:id" element={<ArtBidUpdate />} />
            <Route path="/adminArtworksBid" element={<ArtworksBid />} />

            {/* Financial Manager */}
            <Route path="/paymentgateway" element={<PaymentGateway />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/transactions" element={<Transactions />} />

            {/* User Manager */}
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreaetProfile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/membership" element={<CreateMembership />} />
            <Route path="/allMembership" element={<AllMembership />} />
            <Route path="/edit-membership/:id" element={<EditMembership />} />
            <Route path="/adminMember" element={<AdminMemberships />} />

          </Routes>
        </React.Fragment>
      </div>
    </CartProvider>
  );
}

export default App;