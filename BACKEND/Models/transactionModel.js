const mongoose = require("mongoose");

// Define a schema for the transaction
const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Pre-save hook to auto-generate transactionId
transactionSchema.pre("save", async function (next) {
  const lastTransaction = await this.constructor
    .findOne()
    .sort({ transactionId: -1 });
  if (lastTransaction) {
    const lastTransactionId = lastTransaction.transactionId;
    const idNumber = parseInt(lastTransactionId.substring(1)) + 1;
    this.transactionId = "T" + idNumber.toString().padStart(4, "0");
  } else {
    this.transactionId = "T0001";
  }
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
