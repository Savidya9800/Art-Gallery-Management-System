const Transaction = require("../Models/transactionModel"); // Adjust the path as needed

// Generate a new transaction ID (e.g., TID001)
const generateTransactionId = async () => {
  const latestTransaction = await Transaction.findOne().sort({
    transactionId: -1,
  });
  let newId = "TID001"; // Default ID if no transaction exists yet

  if (latestTransaction) {
    const lastIdNumber = parseInt(latestTransaction.transactionId.substring(3)); // Extract numeric part of the ID
    const newIdNumber = lastIdNumber + 1;
    newId = `TID${newIdNumber.toString().padStart(3, "0")}`; // Pad with leading zeros if necessary
  }

  return newId;
};

// Create a new transaction
const createTransaction = async (req, res) => {
  const { amount, type, category } = req.body;

  try {
    const transactionId = await generateTransactionId(); // Generate unique transaction ID
    const transaction = new Transaction({
      transactionId,
      amount,
      type,
      category,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    res.status(500).json({ message: "Failed to fetch transaction" });
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
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
