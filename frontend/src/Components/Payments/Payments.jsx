import React, { useState, useEffect } from 'react';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';
import { getAllPayments } from '../../services/paymentService';

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data.payments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>All Paid Payments</h1>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>Card Number</th>
              <th style={tableHeaderStyle}>Card Name</th>
              <th style={tableHeaderStyle}>Paid Amount</th>
              <th style={tableHeaderStyle}>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f8f8' }}>
                <td style={tableCellStyle}>{payment.cardNumber}</td>
                <td style={tableCellStyle}>{payment.cardName}</td>
                <td style={tableCellStyle}>${payment.paidAmount.toFixed(2)}</td>
                <td style={tableCellStyle}>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterComp />
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
  color: '#333',
  fontWeight: 'bold',
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

export default Payments;