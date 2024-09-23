import axios from "axios";

const baseUrl = "http://localhost:5001/transactions";

// Axios service for CRUD operations on transactions
const transactionService = {
  // Create Transaction
  async addTransaction(transactionData) {
    try {
      const response = await axios.post(baseUrl, transactionData);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding transaction:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get All Transactions
  async getAllTransactions() {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching transactions:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get Transaction by ID
  async getTransactionById(transactionId) {
    try {
      const response = await axios.get(`${baseUrl}/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching transaction with ID ${transactionId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Get Transactions by User ID
  async getTransactionsByUserId(userId) {
    try {
      const response = await axios.get(`${baseUrl}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching transactions for user ID ${userId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Update Transaction by ID
  async updateTransaction(transactionId, updatedData) {
    try {
      const response = await axios.put(
        `${baseUrl}/${transactionId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating transaction with ID ${transactionId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Delete Transaction by ID
  async deleteTransaction(transactionId) {
    try {
      const response = await axios.delete(`${baseUrl}/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting transaction with ID ${transactionId}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default transactionService;
