// routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const {
  processPayment,
  getAllPayments,
  updatePaymentStatus
} = require("../Controllers/financeController");

router.post("/payment", processPayment);
router.get("/all", getAllPayments);
router.patch('/update-status/:id', updatePaymentStatus);

module.exports = router;
