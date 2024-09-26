import React, { useState } from "react";
import { FaUser, FaBell, FaCreditCard, FaEnvelope, FaHeart, FaHistory, FaCalendarAlt, FaStar, FaSignOutAlt } from "react-icons/fa";
import AdminUsers from "../AdminUsers/AdminUsers";

const AdminDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="w-screen h-screen flex">
      <Sidebar setActiveIndex={setActiveIndex} />
      <div className="flex-1 h-full">
        {activeIndex === 1 && <AdminUsers />}
        {activeIndex === 2 && <div />}
      </div>
    </div>
  );
};

export default AdminDashboard;

// Sidebar Component
const Sidebar = ({ setActiveIndex }) => {
  return (
    <div className="w-48 bg-white border-r border-gray-200 p-5 h-screen">
      <ul>
        <SidebarItem onClick={() => setActiveIndex(1)} icon={FaUser} label="Users" />
        <SidebarItem onClick={() => setActiveIndex(2)} icon={FaBell} label="Notifications" />
        <SidebarItem icon={FaCreditCard} label="Payments" />
        <SidebarItem icon={FaEnvelope} label="Messages" />
        <SidebarItem icon={FaHeart} label="Favorites" />
        <SidebarItem icon={FaHistory} label="Purchase History" />
        <SidebarItem icon={FaCalendarAlt} label="Events" />
        <SidebarItem icon={FaStar} label="Premium Plan" active />
      </ul>
      <button className="bg-yellow-600 text-white py-2 px-4 w-full rounded-lg mt-5 flex items-center justify-center">
        <FaSignOutAlt className="mr-2" /> Log out
      </button>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 mb-2 cursor-pointer text-sm rounded-lg ${active ? "bg-yellow-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}
  >
    <Icon className="mr-3 text-lg" />
    {label}
  </li>
);
