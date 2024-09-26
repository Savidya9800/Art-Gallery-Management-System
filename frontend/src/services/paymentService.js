// services/paymentService.js

import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/payments";

const paymentService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const processPayment = async (paymentData) => {
  try {
    const response = await paymentService.post("/process", paymentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllPayments = async () => {
  try {
    const response = await paymentService.get("/all");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default paymentService;
