const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController.js");

// POST - Add new transaction (Create)
router.post("/", addTransaction);

// GET - Get all transactions (Read)
router.get("/", getAllTransactions);

// GET - Get a transaction by ID (Read)
router.get("/:id", getTransactionById);

// GET - Get transactions by user ID (Read)
router.get("/user/:userId", getTransactionsByUserId);

// PUT - Update a transaction by ID (Update)
router.put("/:id", updateTransaction);

// DELETE - Delete a transaction by ID (Delete)
router.delete("/:id", deleteTransaction);

module.exports = router;
