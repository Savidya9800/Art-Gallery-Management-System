const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require("../Controllers/transactionController");

// Define routes
router.post("/transactions", createTransaction); // Create a new transaction
router.get("/transactions", getAllTransactions); // Get all transactions
router.get("/transactions/:id", getTransactionById); // Get a transaction by ID
router.put("/transactions/:id", updateTransaction); // Update a transaction
router.delete("/transactions/:id", deleteTransaction); // Delete a transaction

module.exports = router;
