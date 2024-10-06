// Import the finance model
const Finance = require("../Models/financeModel");

// Controller function to process and save payment data
const processPayment = async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv, cardName, amount } = req.body;

    // Validate the payment fields
    if (!cardNumber || !expiryDate || !cvv || !cardName || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Calculate the service charge (1.5%) and final amount
    const serviceCharge = amount * 0.015; // 1.5% service charge
    const totalAmount = amount + serviceCharge;

    // Create a new payment entry using the finance model
    const newPayment = new Finance({
      cardNumber,
      expiryDate,
      cvv,
      cardName,
      amount: totalAmount, // Save the total amount including the service charge
      status: "success", // Default to success (can be modified based on real payment logic)
    });

    // Save the payment entry to the database
    const savedPayment = await newPayment.save();

    // Send success response with the total amount
    res.status(201).json({
      message: "Payment recorded successfully",
      totalAmount,
      payment: savedPayment,
    });
  } catch (error) {
    // Handle any errors during the payment process
    res.status(500).json({
      message: "Payment processing failed",
      error: error.message || "An error occurred during payment",
    });
  }
};

// Controller function to get all payment records
const getAllPayments = async (req, res) => {
  try {
    // Fetch all payment records from the database
    const payments = await Finance.find().sort({ paymentDate: -1 });

    // Send the payment data as a response
    res.status(200).json({
      status: "success",
      payments: payments, // Wrap payments in a success response
    });
  } catch (error) {
    console.error("Error fetching payments:", error); // Log the error
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve payment records",
      error: "An error occurred while fetching records.",
    });
  }
};

// Controller function to get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the payment record by its ID
    const payment = await Finance.findById(id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Send the payment data as a response
    res.status(200).json(payment);
  } catch (error) {
    // Handle any errors during data retrieval
    res.status(500).json({
      message: "Failed to retrieve the payment record",
      error: error.message || "An error occurred while fetching the record",
    });
  }
};

// Controller function to update payment status
// Controller function to update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get payment ID from request parameters
    const { status } = req.body; // Get the new status from request body

    // Validate the status field - it must be one of 'pending', 'success', or 'failed'
    const validStatuses = ["success", "reject"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Status must be one of: pending, success, or failed.",
      });
    }

    // Check if the payment record exists
    const payment = await Finance.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update the payment status in the database
    payment.status = status; // Modify the status field
    const updatedPayment = await payment.save(); // Save the updated payment

    // Send the updated payment data as a response
    res.status(200).json({
      message: "Payment status updated successfully",
      payment: updatedPayment,
    });
  } catch (error) {
    // Handle any errors during status update
    console.error("Error updating payment status:", error); // Log the error
    res.status(500).json({
      message: "Failed to update payment status",
      error: error.message || "An error occurred while updating the status",
    });
  }
};

module.exports = {
  processPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus, // Export the new function
};
