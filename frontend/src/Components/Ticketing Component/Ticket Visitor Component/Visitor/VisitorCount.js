import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../../../Nav Component/NavigationBar';
import FooterComp from '../../../Nav Component/FooterComp';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:5000/visitors'; 

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return null;
  }
};

const AdminButton = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 w-full">
      <a
        href="/visitordetails"
        className="inline-block bg-[#A78F51] text-white font-semibold py-2 px-6 rounded-md"
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
        className="inline-block bg-[#A78F51] text-white font-semibold py-2 px-6 rounded-md"
      >
        View Messages (Admin)
      </a>
    </div>
  );
};

function VisitorsCount() {
  const [groupedVisitors, setGroupedVisitors] = useState({});
  const [monthlyVisitorCounts, setMonthlyVisitorCounts] = useState({});
  const [refreshData, setRefreshData] = useState(false); // State to trigger data refresh

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.visitors) {
        groupVisitorsByDateAndTime(data.visitors);
      }
    });
  }, [refreshData]); // Dependency on refreshData

  // Function to group visitors by date and time slot, and calculate total visitors per month
  const groupVisitorsByDateAndTime = (visitors) => {
    const dateGroups = {};
    const monthGroups = {};

    visitors.forEach((visitor) => {
      const date = visitor.date;
      const time = visitor.time;
      const month = date.substring(0, 7); // Extract the "YYYY-MM" part of the date

      // Calculate the total number of tickets for the current visitor
      const totalTickets = visitor.tickets.reduce((sum, ticket) => sum + ticket.count, 0);

      // Group by date and time
      if (!dateGroups[date]) {
        dateGroups[date] = {};
      }

      if (!dateGroups[date][time]) {
        dateGroups[date][time] = 0;
      }

      dateGroups[date][time] += totalTickets;

      // Group by month
      if (!monthGroups[month]) {
        monthGroups[month] = 0;
      }

      monthGroups[month] += totalTickets;
    });

    setGroupedVisitors(dateGroups);
    setMonthlyVisitorCounts(monthGroups);
  };

  // Function to refresh the visitor data
  const refreshVisitorData = () => {
    setRefreshData((prev) => !prev); // Toggle refreshData state
  };

  return (
    <div>
      <NavigationBar />
      <br />
      <AdminButton />
      <TicketIssues />

      <br />
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Visitor Count by Date and Time Slot</h2>

        {/* Table for Date, Time Slot, and Visitor Count */}
        {Object.keys(groupedVisitors).length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300 mb-10">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time Slot</th>
                <th className="border px-4 py-2">Visitor Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedVisitors).map((date) =>
                Object.keys(groupedVisitors[date]).map((time) => (
                  <tr key={`${date}-${time}`}>
                    <td className="border px-4 py-2">{date}</td>
                    <td className="border px-4 py-2">{time}</td>
                    <td className="border px-4 py-2">{groupedVisitors[date][time]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p>No visitor data available.</p>
        )}

        <h2 className="text-2xl font-bold mb-5">Monthly</h2>

        {/* Table for Monthly Visitor Count */}
        {Object.keys(monthlyVisitorCounts).length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Month (YYYY-MM)</th>
                <th className="border px-4 py-2">Total Visitor Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(monthlyVisitorCounts).map((month) => (
                <tr key={month}>
                  <td className="border px-4 py-2">{month}</td>
                  <td className="border px-4 py-2">{monthlyVisitorCounts[month]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No monthly visitor data available.</p>
        )}
      </div>
      <FooterComp />
    </div>
  );
}

export default VisitorsCount;
