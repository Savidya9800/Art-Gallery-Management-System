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
import AdminMemberships from "../AdminMemberships/AdminMemberships";
const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Sidebar setActiveIndex={setActiveIndex} />
      <div style={{ flex: 5, height: "100%" }}>
        {activeIndex === 1 && <AdminUsers />}
        {activeIndex === 2 && <div />}
        {activeIndex === 3 && <AdminMemberships />}
      </div>
    </div>
  );
};

export default AdminDashboard;

// Sidebar Component
const Sidebar = ({ setActiveIndex }) => {
  return (
    <div style={styles.sidebarContainer}>
      <ListGroup variant="flush">
        <SidebarItem
          onClick={() => {
            setActiveIndex(1);
          }}
          icon={FaUser}
          label="Users"
        />
        <SidebarItem
          onClick={() => {
            setActiveIndex(3);
          }}
          icon={FaUser}
          label="Memberships"
        />
        <SidebarItem
          onClick={() => {
            setActiveIndex(2);
          }}
          icon={FaBell}
          label="Notifications"
        />
        <SidebarItem icon={FaCreditCard} label="Payments" />
        <SidebarItem icon={FaEnvelope} label="Messages" />
        <SidebarItem icon={FaHeart} label="Favorites" />
        <SidebarItem icon={FaHistory} label="Purchase History" />
        <SidebarItem icon={FaCalendarAlt} label="Events" />
        <SidebarItem icon={FaStar} label="Premium Plan" active />
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
    width: "200px",
    backgroundColor: "#fdfdfd",
    borderRight: "1px solid #ddd",
    padding: "20px 10px",
    height: "100vh",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
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
