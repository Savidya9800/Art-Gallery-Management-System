// controllers/paymentController.js

const Payment = require("../Models/payment");

exports.processPayment = async (req, res) => {
  try {
    const { cardNumber, expiryDate, cvv, cardName, paidAmount } = req.body;

    const newPayment = new Payment({
      cardNumber,
      expiryDate,
      cvv,
      cardName,
      paidAmount,
    });

    await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment processed successfully",
      payment: {
        cardNumber: newPayment.cardNumber,
        cardName: newPayment.cardName,
        paidAmount: newPayment.paidAmount,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Payment processing failed",
      error: error.message,
    });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().select("-cvv");
    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve payments",
      error: error.message,
    });
  }
};
