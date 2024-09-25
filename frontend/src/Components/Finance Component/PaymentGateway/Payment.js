import React, { useState } from "react";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";
import axios from "axios"; // For making API calls
import { jsPDF } from "jspdf"; // For generating PDF

const PaymentGateway = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    amount: 100, // Initial amount value
  });
  const [totalAmount, setTotalAmount] = useState(100 * 1.015); // Initial total amount with 1.5% service charge
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Card number validation: limit to 16 characters
    if (name === "cardNumber" && value.length > 16) return;

    // Name on card validation: only letters and spaces allowed
    if (name === "cardName" && !/^[a-zA-Z\s]*$/.test(value)) {
      return; // Prevent invalid characters from being entered
    }

    setFormData({ ...formData, [name]: value });

    // If amount changes, calculate total with 1.5% service charge
    if (name === "amount") {
      const amountValue = parseFloat(value) || 0;
      const updatedTotal = amountValue * 1.015; // Adding 1.5% service charge
      setTotalAmount(updatedTotal);
    }
  };

  // Validate expiry date format and future month/year
  const isValidExpiryDate = (expiry) => {
    const [month, year] = expiry.split("/");

    if (month && year) {
      const expiryDate = new Date(`20${year}`, month - 1);
      const today = new Date();
      return expiryDate > today; // The expiry date must be in the future
    }
    return false;
  };

  // Generate a PDF payment slip
  const generatePaymentSlip = (totalAmountPaid) => {
    const doc = new jsPDF();

    doc.text("Payment Receipt", 20, 20);
    doc.text(`Name on Card: ${formData.cardName}`, 20, 30);
    doc.text(`Card Number: **** **** **** ${formData.cardNumber.slice(-4)}`, 20, 40); // Masking card number
    doc.text(`Total Amount Paid: $${totalAmountPaid}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

    doc.save("payment_receipt.pdf");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", content: "" });

    // Expiry date validation
    if (!isValidExpiryDate(formData.expiryDate)) {
      setMessage({
        type: "error",
        content: "Invalid expiry date. Please select a future date in the format MM/YY.",
      });
      setLoading(false);
      return;
    }

    try {
      // Make POST request to backend API to process payment
      const response = await axios.post("http://localhost:5000/finance/payment", {
        ...formData,
        amount: parseFloat(formData.amount), // Ensure amount is a number
      });

      // If successful, display success message and generate the slip
      if (response.status === 201) {
        const totalAmountPaid = response.data.totalAmount.toFixed(2);
        setMessage({
          type: "success",
          content: `Payment successful! Total Amount Paid: $${totalAmountPaid}`,
        });

        // Generate the payment slip PDF
        generatePaymentSlip(totalAmountPaid);
      }
    } catch (error) {
      // Handle errors during the payment process
      setMessage({
        type: "error",
        content: error.response?.data?.message || "Payment failed. Please check your details.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="payment-container min-h-screen flex flex-col">
      <NavigationBar />
      <div className="payment-form flex-grow flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <h3 className="text-xl mb-4">Total Amount: ${totalAmount.toFixed(2)}</h3>
        {message.content && (
          <div
            className={`message ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            } mb-4`}
          >
            {message.content}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <div className="form-group mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength="16" // Limit to 16 characters
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="form-row flex space-x-4 mb-4">
            <div className="form-group flex-1">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                maxLength="5"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group flex-1">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                maxLength="3"
                value={formData.cvv}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="pay-button w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
      <FooterComp />
    </div>
  );
};

export default PaymentGateway;
