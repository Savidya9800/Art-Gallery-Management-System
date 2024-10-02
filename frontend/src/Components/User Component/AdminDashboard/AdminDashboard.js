import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import {
  FaUser,
  FaBell,
  FaCreditCard,
  FaEnvelope,
  FaHeart,
  FaHistory,
  FaCalendarAlt,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import AdminUsers from "../AdminUsers/AdminUsers";
import Notifications from "./Pages/Notification"; 
import ArtworkAdmin from "./Pages/ArtworkAdmin";
import BiddingAdmin from "./Pages/BiddingAdmin";
import EventAdmin from "./Pages/EventAdmin";
import TicketAdmin from "./Pages/TicketAdmin";
import InventoryAdmin from "./Pages/InventoryAdmin"; 
import FinanceAdmin from "./Pages/FinanceAdmin"; 
import InquiryAdmin from "./Pages/InquiryAdmin";
import DashHome from "./DashHome";
import Profile from "../Profile/Profile";

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const passcodes = {
    users: "user",
    notifications: "notification",
    artwork: "artwork",
    event: "event",
    bidding: "bidding",
    ticket: "ticket",
    inventory: "inventory",
    finance: "finance",
    inquiry: "inquiry",
  };

  const validatePasscode = (passcode, correctPasscode, callback) => {
    if (passcode === correctPasscode) {
      callback();
    } else {
      alert("Invalid passcode");
    }
  };

  return (
    <div style={{ width: "full", height: "100vh", display: "flex" }}>
      <Sidebar setActiveIndex={setActiveIndex} validatePasscode={validatePasscode} passcodes={passcodes} />
      <div style={{ flex: 5, height: "100%" }}>
        {activeIndex === 0 && <Profile />} 
        {activeIndex === 1 && <AdminUsers />}
        {activeIndex === 2 && <ArtworkAdmin />}
        {activeIndex === 3 && <EventAdmin />}
        {activeIndex === 4 && <BiddingAdmin />}
        {activeIndex === 5 && <TicketAdmin />}
        {activeIndex === 6 && <InventoryAdmin />}
        {activeIndex === 7 && <FinanceAdmin />}
        {activeIndex === 8 && <InquiryAdmin />}
      </div>
    </div>
  );
};

export default AdminDashboard;

// Sidebar Component
const Sidebar = ({ setActiveIndex, validatePasscode, passcodes }) => {
  return (
    <div style={styles.sidebarContainer}>
      <ListGroup variant="flush">
        <SidebarItem
          onClick={() => setActiveIndex(0)}
          icon={FaUser}
          label="Home"
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.users, () => setActiveIndex(1));
          }}
          icon={FaUser}
          label="User Management"
        />
        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.artwork, () => setActiveIndex(2));
          }}
          icon={FaBell}
          label="Artwork Management"  
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.event, () => setActiveIndex(3));
          }}
          icon={FaBell}
          label="Event Management"
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.bidding, () => setActiveIndex(4));
          }}
          icon={FaBell}
          label="Bidding Management"
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.ticket, () => setActiveIndex(5));
          }}
          icon={FaBell}
          label="Ticket Management"
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.inventory, () => setActiveIndex(6));
          }}
          icon={FaBell}
          label="Inventory Management"
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.finance, () => setActiveIndex(7));
          }}
          icon={FaBell}
          label="Finance Management"
        />

        <SidebarItem
          onClick={() => {
            validatePasscode(prompt("Enter passcode:"), passcodes.inquiry, () => setActiveIndex(8));
          }}
          icon={FaBell}
          label="Finance Management"
        />

        
      </ListGroup>
      <Button style={styles.logoutButton}>
        <FaSignOutAlt /> Log out
      </Button>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <ListGroup.Item
    onClick={onClick}
    action
    style={active ? styles.activeItem : styles.menuItem}
  >
    <Icon style={styles.icon} />
    {label}
  </ListGroup.Item>
);

// Styles
const styles = {
  sidebarContainer: {
    padding: "100px",
    borderRight: "1px solid #ddd",
    padding: "20px 10px",
    height: "187vh",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "20px 15px",
    marginBottom: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#555",
    borderRadius: "8px",
    backgroundColor: "transparent",
  },
  activeItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    marginBottom: "8px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#a88732",
    borderRadius: "8px",
  },
  icon: {
    marginRight: "12px",
    fontSize: "16px",
  },
  logoutButton: {
    backgroundColor: "#a88732",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    width: "100%",
    borderRadius: "8px",
    marginTop: "20px",
    fontSize: "14px",
  },
};