import React, { useState } from 'react';
import FooterComp from '../Nav Component/FooterComp';
import NavigationBar from '../Nav Component/NavigationBar';
import { processPayment } from '../../services/paymentService';

const PaymentGateway = () => {
  const [totalAmount, setTotalAmount] = useState(100);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const response = await processPayment({ ...formData, paidAmount: totalAmount });
      setMessage({ type: 'success', content: 'Payment processed successfully!' });
    } catch (error) {
      setMessage({ type: 'error', content: error.message || 'Payment processing failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <NavigationBar />
      <div className="payment-form">
        <h2>Payment Details</h2>
        <h3>Total Amount: ${totalAmount}</h3>
        {message.content && (
          <div className={`message ${message.type}`}>
            {message.content}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                maxLength="5"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="123"
                maxLength="3"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="pay-button" disabled={loading}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
      <FooterComp />
      <style jsx>{`
        .payment-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .payment-form {
          flex: 1;
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #f8f8f8;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h2, h3 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-row {
          display: flex;
          justify-content: space-between;
        }
        .form-row .form-group {
          width: 48%;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        .pay-button {
          display: block;
          width: 100%;
          padding: 0.75rem;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .pay-button:hover {
          background-color: #45a049;
        }
        .pay-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .message {
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 4px;
          text-align: center;
        }
        .message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
      `}</style>
    </div>
  );
}

export default PaymentGateway;