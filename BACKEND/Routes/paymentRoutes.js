// routes/paymentRoutes.js

const express = require("express");
const router = express.Router();
const {
  processPayment,
  getPayments,
} = require("../controllers/paymentController");

router.post("/process", processPayment);
router.get("/all", getPayments);

module.exports = router;
