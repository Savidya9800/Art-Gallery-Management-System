import NavigationBar from "../Nav Component/NavigationBar";
import FooterComp from "../Nav Component/FooterComp";
import React, { useState, useEffect } from "react";
import transactionService from "../../services/transactionService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./Transactions.css"; // External CSS file for styling

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalExpenses, setTotalExpenese] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [editingTransactionId, setEditingTransactionId] = useState(null); // Track the transaction being edited
  const [searchTransactionId, setSearchTransactionId] = useState(""); // For storing the search term
  const [filteredTransactions, setFilteredTransactions] = useState([]); // Store filtered transactions for search results
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    type: "Income",
    category: "",
  });

  // Fetch all transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const data = await transactionService.getAllTransactions();
        setTransactions(data);
        setFilteredTransactions(data); // Initially show all transactions
        setError("");
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setTotalExpenese(totalExpense);
    setTotalIncome(totalIncome);
  }, [filteredTransactions]);

  // Handle input change for new transaction
  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  // Add new transaction or update existing one
  const handleAddOrUpdateTransaction = async () => {
    if (
      !newTransaction.amount ||
      !newTransaction.type ||
      !newTransaction.category
    ) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      if (editingTransactionId) {
        // Update transaction
        await transactionService.updateTransaction(editingTransactionId, {
          ...newTransaction,
        });
      } else {
        // Add new transaction
        await transactionService.addTransaction({
          ...newTransaction,
          userId: "642762932f2153001f261234", // Set userId accordingly
        });
      }

      const data = await transactionService.getAllTransactions();
      setTransactions(data);
      setFilteredTransactions(data); // Update filtered transactions as well
      setNewTransaction({ amount: "", type: "", category: "" });
      setEditingTransactionId(null); // Clear editing state
      setError("");
    } catch (err) {
      setError("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (transactionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmed) {
      setLoading(true);
      try {
        await transactionService.deleteTransaction(transactionId);
        const updatedTransactions = transactions.filter(
          (t) => t._id !== transactionId
        );
        setTransactions(updatedTransactions);
        setFilteredTransactions(updatedTransactions);
        setError("");
      } catch (err) {
        setError("Failed to delete transaction");
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit transaction: Pre-fill input fields and set editingTransactionId
  const handleEditTransaction = (transaction) => {
    setNewTransaction({
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
    });
    setEditingTransactionId(transaction._id);
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTransactionId(e.target.value);
  };

  // Search transactions by transactionId
  const handleSearchTransaction = () => {
    if (searchTransactionId.trim() === "") {
      setFilteredTransactions(transactions); // Reset to all transactions if search is cleared
    } else {
      const filtered = transactions.filter((transaction) =>
        transaction.transactionId
          .toLowerCase()
          .includes(searchTransactionId.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  // Generate PDF Report
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add title
    doc.text("Transaction Report", 20, 10);

    // Add autoTable with transaction data
    doc.autoTable({
      head: [["Transaction ID", "Type", "Category", "Amount"]],
      body: filteredTransactions.map((transaction) => [
        transaction.transactionId,
        transaction.type,
        transaction.category,
        transaction.amount,
      ]),
    });

    // Add total summary
    doc.text(
      `Total Income: Rs. ${totalIncome}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Total Expense: Rs. ${totalExpenses}`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    // Save the PDF
    doc.save("transaction_report.pdf");
  };

  return (
    <div>
      <NavigationBar />
      <div className="transaction-container">
        <h2>Add Income / Expense (Internal)</h2>

        <div className="add-transaction">
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <select
            name="type"
            onChange={handleInputChange}
            value={newTransaction.type ?? "Income"}
          >
            <option value={"Income"}>Income</option>
            <option value={"Expense"}>Expense</option>
          </select>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newTransaction.category}
            onChange={handleInputChange}
          />
          <button onClick={handleAddOrUpdateTransaction} className="add-button">
            {editingTransactionId ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>

        <div className="search-transaction">
          <input
            type="text"
            name="searchTransactionId"
            placeholder="Search by Transaction ID"
            value={searchTransactionId}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchTransaction} className="prime">
            Search
          </button>
        </div>

        <div className="income-summary">
          <div
            style={{
              display: "flex",
              marginBottom: 8,
              alignItems: "center",
              background: "wheat",
            }}
          >
            <span>Total Income For the Month:</span>
            <p className="total-container">Rs. {totalIncome}</p>
          </div>
          <div
            style={{ display: "flex", marginBottom: 8, alignItems: "center" }}
          >
            <span>Total Expense For the Month:</span>
            <p className="total-container">Rs. {totalExpenses}</p>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <h3>Recent Records</h3>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>Rs. {transaction.amount}</td>
                <td>
                  <button
                    onClick={() => handleEditTransaction(transaction)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button className="prime">Logout</button>
          <button className="prime" onClick={handleGenerateReport}>
            Generate Report
          </button>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default Transactions;
