import React, { useState, useEffect } from "react";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios"; // Import axios for API calls
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";




const Payments = () => {
  const [payments, setPayments] = useState([]); // Initialize payments as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors
  const navigate = useNavigate();


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

      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">All Paid Payments</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Payment ID, Card Name, or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 text-base bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <Button variant="dark mb-2" onClick={() => navigate("/transactions")}>Inter Transactions</Button>
        <div className="bg-[#e9d8b2] rounded-lg shadow-md p-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left border-b">Payment ID</th>
                <th className="px-4 py-2 text-left border-b">Card Number</th>
                <th className="px-4 py-2 text-left border-b">Card Name</th>
                <th className="px-4 py-2 text-left border-b">Category</th>
                <th className="px-4 py-2 text-left border-b">Paid Amount</th>
                <th className="px-4 py-2 text-left border-b">Payment Date</th>
                <th className="px-4 py-2 text-left border-b">Status</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{payment.paymentId}</td>
                    <td className="px-4 py-2 border-b">
                      {formatCardNumber(payment.cardNumber)}
                    </td>
                    <td className="px-4 py-2 border-b">{payment.cardName}</td>
                    <td className="px-4 py-2 border-b">{payment.category}</td>
                    <td className="px-4 py-2 border-b">{payment.amount}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b">{payment.status}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="px-3 py-1 text-white bg-indigo-500 rounded hover:bg-indigo-600"
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
                  <td colSpan="8" className="py-4 text-center">
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
