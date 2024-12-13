import NavigationBar from "../../Nav Component/NavigationBar";
import FooterComp from "../../Nav Component/FooterComp";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import logo from "./logo.JPG";
import { useNavigate } from "react-router";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    type: "Income",
    category: "",
  });

  // Fetch all transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/transaction/transactions"
        ); // Adjust URL as necessary
        setTransactions(response.data);
        setFilteredTransactions(response.data);
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
    setTotalExpenses(totalExpense);
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
        await axios.put(
          `http://localhost:5000/transaction/transactions/${editingTransactionId}`,
          newTransaction
        );
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction._id === editingTransactionId
              ? { ...transaction, ...newTransaction }
              : transaction
          )
        );
      } else {
        // Add new transaction
        const response = await axios.post(
          "http://localhost:5000/transaction/transactions",
          newTransaction
        );
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          response.data,
        ]);
      }

      setFilteredTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
      setNewTransaction({ amount: "", type: "Income", category: "" });
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
        await axios.delete(
          `http://localhost:5000/transaction/transactions/${transactionId}`
        );
        setTransactions((prevTransactions) =>
          prevTransactions.filter((t) => t._id !== transactionId)
        );
        setFilteredTransactions((prevTransactions) =>
          prevTransactions.filter((t) => t._id !== transactionId)
        );
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
    setSearchTerm(e.target.value);
  };

  // Handle month filter change
  const handleMonthChange = (e) => {
    setFilterMonth(parseInt(e.target.value)); // Convert to integer
  };

  // Filter transactions based on category and month
  useEffect(() => {
    let filtered = transactions;

    // Filter by search term (transaction ID or category)
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (transaction) =>
          transaction.transactionId.toString().includes(searchTerm) || // Check transaction ID
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) // Check category
      );
    }

    // Filter by month
    const startOfMonth = new Date(new Date().getFullYear(), filterMonth, 1);
    const endOfMonth = new Date(new Date().getFullYear(), filterMonth + 1, 0);

    filtered = filtered.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
    });

    setFilteredTransactions(filtered);
  }, [searchTerm, filterMonth, transactions]);

  // Format date to display only the date part
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Change format as needed
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();

    // Add a background color for the title
    doc.setFillColor(167, 143, 81); // Light lavender background
    doc.rect(10, 10, 190, 15, "F"); // Rectangle for title background

    // Add title to the PDF
    doc.setFontSize(22);
    doc.setTextColor(240, 237, 230); // Dark Slate Gray color for text
    doc.text("Transaction Report", 14, 20);

    // Add logo
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgWidth = 25; // Width of the logo
    const imgHeight = 20; // Height of the logo
    const xPosition = pageWidth - imgWidth - 10;
    doc.addImage(logo, "JPEG", xPosition, 10, imgWidth, imgHeight);

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169); // Gray color
    doc.line(10, 30, 200, 30);

    // Add table with transaction details
    const tableData = filteredTransactions.map((transaction) => [
      transaction.transactionId, // Include transaction ID
      transaction.type,
      transaction.category,
      `Rs. ${transaction.amount}`,
      formatDate(transaction.date),
    ]);

    doc.autoTable({
      head: [["Transaction ID", "Type", "Category", "Amount", "Date"]], // Update header
      body: tableData,
      startY: 35, // Position after the title
      theme: "grid",
      styles: { fontSize: 12, cellPadding: 2 },
      headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Add total summary
    const startY = doc.lastAutoTable.finalY + 10; // Position after the table
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Reset to black for content
    doc.text(`Total Income: Rs. ${totalIncome}`, 14, startY);
    doc.text(`Total Expense: Rs. ${totalExpenses}`, 14, startY + 10);

    // Add a line below the title
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169);
    doc.line(10, 30, 200, 30);

    // Add line above the footer
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setLineWidth(0.5);
    doc.setDrawColor(169, 169, 169);
    doc.line(10, footerY - 5, 200, footerY - 5);

    // Footer text (right-aligned)
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);

    doc.text("Art Gallery Name", pageWidth - 14, footerY, { align: "right" });
    doc.text(
      "Address: 58, Parakrama Mawatha, Wennappuwa",
      pageWidth - 14,
      footerY + 5,
      { align: "right" }
    );
    doc.text(
      "Contact: +94 765 456 789 | Email: awarnaArts@gmail.com",
      pageWidth - 14,
      footerY + 10,
      { align: "right" }
    );

    // Add line below the footer
    doc.line(10, footerY + 15, 200, footerY + 15);

    // Save the PDF
    doc.save("transaction_report.pdf");
  };

  return (
    <div>
      <NavigationBar />

      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Add Income / Expense (Internal)
        </h2>

        <div className="bg-[#e9d8b2] rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-wrap items-center mb-4">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded mr-2 w-full md:w-1/4"
            />
            <select
              name="type"
              onChange={handleInputChange}
              value={newTransaction.type}
              className="border border-gray-300 p-2 rounded mr-2 w-full md:w-1/4"
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
              className="border border-gray-300 p-2 rounded mr-2 w-full md:w-1/4"
            />
            <button
              onClick={handleAddOrUpdateTransaction}
              className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
            >
              {editingTransactionId ? "Update" : "Add"}
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by Transaction ID or Category"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          />

          {/* Month filter */}
          <select
            onChange={handleMonthChange}
            value={filterMonth}
            className="border border-gray-300 p-2 rounded mb-4 w-full"
          >
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>

          <div className="mt-4">
            <h3 className="text-lg font-bold">
              Total Income: Rs. {totalIncome}
            </h3>
            <h3 className="text-lg font-bold">
              Total Expenses: Rs. {totalExpenses}
            </h3>
            <button
              onClick={handleGenerateReport}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Generate Report
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-200 p-2">Transaction ID</th>
                  <th className="border border-gray-200 p-2">Type</th>
                  <th className="border border-gray-200 p-2">Category</th>
                  <th className="border border-gray-200 p-2">Amount</th>
                  <th className="border border-gray-200 p-2">Date</th>
                  <th className="border border-gray-200 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-100">
                    <td className="border border-gray-200 p-2">
                      {transaction.transactionId}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {transaction.type}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {transaction.category}
                    </td>
                    <td className="border border-gray-200 p-2">
                      Rs. {transaction.amount}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        className="bg-yellow-500 text-white p-1 mr-2 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction._id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FooterComp />
    </div>
  );
};

export default Transactions;
