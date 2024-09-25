<<<<<<< Updated upstream
const Transaction = require("../models/transactionModel");

const generateTransactionId = async () => {
  const lastTransaction = await Transaction.findOne().sort({ createdAt: -1 });
  if (lastTransaction) {
    const lastId = lastTransaction.transactionId;
    const lastNumber = parseInt(lastId.substring(1)); // Extract the number part from transactionId
    const nextId = "T" + (lastNumber + 1).toString().padStart(4, "0"); // Increment and pad the number
    return nextId;
  } else {
    return "T0001"; // First transaction if none exist
  }
};

// Add Transaction (Create)
const addTransaction = async (req, res) => {
  try {
    const newTransactionId = await generateTransactionId();
    const { type, category, amount, userId } = req.body;
    const transaction = new Transaction({
      type,
      category,
      amount,
      userId,
      transactionId: newTransactionId,
    });
    await transaction.save();
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating transaction", details: error.message });
  }
};

// Get All Transactions (Read)
=======
const Transaction = require('../Models/transactionModel'); // Adjust the path as needed

// Create a new transaction
const createTransaction = async (req, res) => {
  const { amount, type, category } = req.body;

  try {
    const transaction = new Transaction({ amount, type, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};

// Get all transactions
>>>>>>> Stashed changes
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
<<<<<<< Updated upstream
    res
      .status(500)
      .json({ error: "Error fetching transactions", details: error.message });
  }
};

// Get Transaction by ID (Read)
const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching transaction", details: error.message });
  }
};

// Get Transactions by User ID (Read)
const getTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      error: "Error fetching transactions for user",
      details: error.message,
    });
  }
};

// Update Transaction by ID (Update)
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, userId } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, category, amount, userId },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating transaction", details: error.message });
  }
};

// Delete Transaction by ID (Delete)
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting transaction", details: error.message });
=======
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Failed to fetch transaction' });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, type, category } = req.body;

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, type, category },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ message: 'Failed to update transaction' });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Failed to delete transaction' });
>>>>>>> Stashed changes
  }
};

module.exports = {
<<<<<<< Updated upstream
  addTransaction,
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
=======
  createTransaction,
  getAllTransactions,
  getTransactionById,
>>>>>>> Stashed changes
  updateTransaction,
  deleteTransaction,
};
