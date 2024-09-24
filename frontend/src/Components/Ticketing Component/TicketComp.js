import React from "react";
import NavigationBar from "../Nav Component/NavigationBar";
import FooterComp from "../Nav Component/FooterComp";
import bannerImage from '../Ticketing Component/Ticket Visitor Component/Images/bannerImage.jpg'; // Add your banner image
import MessageAdmin from "../Ticketing Component/Ticket Issues/MessageAdmin"; // Import the new component

// Ticket Table Component
const TicketTable = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Ticket type
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">
                Prices
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Adult (Age 19+)
              </td>
              <td className="py-2 px-4 border-b border-gray-300">£10.00</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Student (Full-time with valid I.D)
              </td>
              <td className="py-2 px-4 border-b border-gray-300">$20</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Senior (Age 65+)
              </td>
              <td className="py-2 px-4 border-b border-gray-300">$15</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Child (Age 6-18)
              </td>
              <td className="py-2 px-4 border-b border-gray-300">$10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Ticket Purchase Section Component
const TicketPurchaseSection = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full">
      <hr />
      <p className="mb-4">Click here to buy your tickets</p>
      <a
        href="/addVisitor"
        className="inline-block bg-[#A78F51] text-white font-semibold py-2 px-6 rounded-full"
      >
        Buy tickets
      </a>
      <hr />
    </div>
  );
};

// Group Visit Info Component
const GroupVisitInfo = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full">
      <h2 className="text-2xl font-semibold mb-4">Group visits</h2>
      <p className="text-gray-700 mb-4">
        For groups of 10 or more people, we require an advance booking. We may not be able to accommodate visits from groups that have not pre-arranged their visit, so please book to avoid disappointment. Bookings can be made by completing a booking form{" "}
        <a
          href="https://your-booking-link.com"
          className="text-blue-600 underline hover:text-blue-800"
        >
          here
        </a>{" "}
        or by emailing{" "}
        <a
          href="mailto:group.bookings@ymt.org.uk"
          className="text-blue-600 underline hover:text-blue-800"
        >
          group.bookings@ymt.org.uk
        </a>.
      </p>
      <p className="text-gray-700 mb-4">
        We require advance booking to ensure that we are able to admit your group at your chosen time.
      </p>
      <p className="text-gray-700">
        If you would like to book a visit for a school group, please visit our{" "}
        <a
          href="https://your-schools-page.com"
          className="text-blue-600 underline hover:text-blue-800"
        >
          schools page
        </a>{" "}
        or email{" "}
        <a
          href="mailto:schools@ymt.org.uk"
          className="text-blue-600 underline hover:text-blue-800"
        >
          schools@ymt.org.uk
        </a>{" "}
        for more information.
      </p>
    </div>
  );
};

// Admin Button Component
const AdminButton = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full">
      <a
        href="/visitordetails"
        className="inline-block bg-red-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-500"
      >
        View Visitor Details (Admin)
      </a>
    </div>
  );
};

const TicketIssues = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full">
      <a
        href="/message"
        className="inline-block bg-red-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-500"
      >
        View Visitor Details (Admin)
      </a>
    </div>
  );
};

// Banner Component
const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <img
          src={bannerImage}
          alt="Toulouse-Lautrec and the Masters of Montmartre"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="text-center px-4 sm:px-8 mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        Every painting tells a story
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
        Art is inspiring. Walking into a gallery, or when the lights go up on a stage; that thrill of getting something that
         has nothing to do with acquisition.
        </p>
      </div>
    </div>
  );
};

// Main Ticket Prices Page Component
const TicketPrices = () => {
  return (
    <div>
      <NavigationBar />
      
      {/* Banner Section */}
      <Banner />
      
      <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-8">
        {/* Title Section */}
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">Visit Us</h1>
          <p className="text-lg mb-6">
            If you are planning to visit the museum, here are the ticket prices
          </p>

          {/* Ticket Table */}
          <TicketTable />

          {/* Group Visit Info, Ticket Purchase Section, Admin Button, and Message Admin (Horizontally aligned) */}
          <div className="flex flex-col lg:flex-row justify-between mt-6 space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Group Visit Info */}
            <div className="w-full lg:w-1/4">
              <GroupVisitInfo />
            </div>

            {/* Ticket Purchase Section */}
            <div className="w-full lg:w-1/4">
              <TicketPurchaseSection />
            </div>

            

            {/* Message Admin Section */}
            <div className="w-full lg:w-1/4">
              <MessageAdmin />
            </div>
          </div>
          {/* Admin Button Section */}
          <div className="w-full lg:w-1/4">
              <AdminButton />
              <TicketIssues/>
            </div>
        </div>
      </div>

      <FooterComp />
    </div>
  );
};

export default TicketPrices;