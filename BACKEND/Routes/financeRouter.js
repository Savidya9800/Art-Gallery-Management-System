const express = require('express');
const { processPayment, getAllPayments, getPaymentById, updatePaymentStatus } = require('../Controllers/financeController');
const router = express.Router();

// Route to process a new payment
router.post('/payment', processPayment);

// Route to get all payments
router.get('/all', getAllPayments);

// Route to get a specific payment by ID
router.get('/payment/:id', getPaymentById);

router.patch('/update-status/:id', updatePaymentStatus);

module.exports = router;
