import React, { useState, useEffect } from "react";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios"; // Import axios for API calls

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
    const newStatus = currentStatus === 'success' ? 'reject' : 'success'; // Toggle status

    try {
      // Call API to update the status
      const response = await axios.patch(`http://localhost:5000/finance/update-status/${paymentId}`, { status: newStatus });

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
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          All Paid Payments
        </h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={tableHeaderStyle}>Card Number</th>
              <th style={tableHeaderStyle}>Card Name</th>
              <th style={tableHeaderStyle}>Paid Amount</th>
              <th style={tableHeaderStyle}>Payment Date</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              return (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8f8f8",
                  }}
                >
                  <td style={tableCellStyle}>{formatCardNumber(payment.cardNumber)}</td>
                  <td style={tableCellStyle}>{payment.cardName}</td>
                  <td style={tableCellStyle}>{payment.amount}</td>
                  <td style={tableCellStyle}>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </td>
                  <td style={tableCellStyle}>{payment.status}</td>
                  <td style={tableCellStyle}>
                    <button onClick={() => handleStatusChange(payment._id, payment.status)}>
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

const tableHeaderStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  color: "#333",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

export default Payments;
