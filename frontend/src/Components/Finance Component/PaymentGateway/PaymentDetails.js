import React, { useState, useEffect } from "react";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios"; // Import axios for API calls
import { useNavigate } from "react-router";

const Payments = () => {
  const [payments, setPayments] = useState([]); // Initialize payments as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/finance/all");
        console.log(response.data); // Log the entire response to check the structure

        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else if (response.data && Array.isArray(response.data.payments)) {
          setPayments(response.data.payments);
        } else {
          console.error("Expected payments to be an array");
          setError("Failed to fetch payments.");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("Failed to fetch payments.");
      } finally {
        setLoading(false); // Set loading to false after trying to fetch data
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an error
  }

  // Ensure payments is always an array before mapping
  if (!Array.isArray(payments)) {
    return <div>No payment records found.</div>; // Handle case where payments is not an array
  }

  // Function to handle status change
  const handleStatusChange = async (paymentId, currentStatus) => {
    const newStatus = currentStatus === "success" ? "reject" : "success"; // Toggle status

    try {
      // Call API to update the status
      const response = await axios.patch(
        `http://localhost:5000/finance/update-status/${paymentId}`,
        { status: newStatus }
      );

      // If the update is successful, reload the page
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally, set an error state here
    }
  };

  // Utility function to mask card number
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
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Card Number</th>
              <th className="py-2 px-4 border-b">Card Name</th>
              <th className="py-2 px-4 border-b">Paid Amount</th>
              <th className="py-2 px-4 border-b">Payment Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">
                    {formatCardNumber(payment.cardNumber)}
                  </td>
                  <td className="py-2 px-4 border-b">{payment.cardName}</td>
                  <td className="py-2 px-4 border-b">{payment.amount}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                      onClick={() =>
                        handleStatusChange(payment._id, payment.status)
                      }
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <FooterComp />
    </div>
  );
};

//const tableHeaderStyle = {
//  padding: "12px",
//  textAlign: "left",
//  borderBottom: "1px solid #ddd",
//  color: "#333",
//  fontWeight: "bold",
//};

//const tableCellStyle = {
//  padding: "12px",
//  textAlign: "left",
//  borderBottom: "1px solid #ddd",
//};

export default Payments;
