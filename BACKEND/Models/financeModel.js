const mongoose = require("mongoose");

// Define the finance schema
const financeSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now, // Automatically set the payment date when the record is created
  },
  status: {
    type: String,
    enum: ["success", "reject"], // The status can only be 'success' or 'reject'
    default: "reject", // Default value set to 'success'
  },
});

// Create the finance model
const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;
