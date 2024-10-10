import React, { useState, useEffect } from "react";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router";

const Payments = () => {
  const [payments, setPayments] = useState([]); // Initialize payments as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  // State for search inputs
  const [searchTerm, setSearchTerm] = useState(""); // Single state for combined search

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/finance/all");
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else if (response.data && Array.isArray(response.data.payments)) {
          setPayments(response.data.payments);
        } else {
          setError("Failed to fetch payments.");
        }
      } catch (error) {
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Handle combined search functionality
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.paymentId.includes(searchTerm) ||
      payment.cardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to handle status change
  const handleStatusChange = async (paymentId, currentStatus) => {
    const newStatus = currentStatus === "success" ? "reject" : "success";

    try {
      const response = await axios.patch(
        `http://localhost:5000/finance/update-status/${paymentId}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const formatCardNumber = (cardNumber) => {
    const lastFourDigits = cardNumber.slice(-4);
    const maskedDigits = "X".repeat(cardNumber.length - 4);
    return maskedDigits + lastFourDigits;
  };

  return (
    <div>
      <NavigationBar />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Paid Payments</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Payment ID, Card Name, or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full text-base bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>
        <div className="bg-[#e9d8b2] rounded-lg shadow-md p-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-left">Payment ID</th>
                <th className="py-2 px-4 border-b text-left">Card Number</th>
                <th className="py-2 px-4 border-b text-left">Card Name</th>
                <th className="py-2 px-4 border-b text-left">Category</th>
                <th className="py-2 px-4 border-b text-left">Paid Amount</th>
                <th className="py-2 px-4 border-b text-left">Payment Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{payment.paymentId}</td>
                    <td className="py-2 px-4 border-b">
                      {formatCardNumber(payment.cardNumber)}
                    </td>
                    <td className="py-2 px-4 border-b">{payment.cardName}</td>
                    <td className="py-2 px-4 border-b">{payment.category}</td>
                    <td className="py-2 px-4 border-b">{payment.amount}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{payment.status}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-indigo-500 text-white py-1 px-3 rounded hover:bg-indigo-600"
                        onClick={() =>
                          handleStatusChange(payment._id, payment.status)
                        }
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FooterComp />
    </div>
  );
};

export default Payments;
