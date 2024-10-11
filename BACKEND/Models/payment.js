// models/Payment.js

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    cardNumber: {
      type: String,
      required: true,
      set: function (cardNumber) {
        return "xxxx-xxxx-xxxx-" + cardNumber.slice(-4);
      },
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
    paidAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
