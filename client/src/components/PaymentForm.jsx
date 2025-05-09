  // PaymentForm.jsx
  import React, { useState } from 'react';

  function PaymentForm({ onPaymentSubmit }) {
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const paymentData = {
        nameOnCard,
        cardNumber,
        expiryDate,
        cvv,
        amount
      };
      onPaymentSubmit(paymentData); // Pass payment data to parent
      // Optionally reset form
      setNameOnCard('');
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setAmount('');
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Make a Payment</h2>

        <div>
          <label>Name on Card:</label>
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Card Number:</label>
          <input
            type="text"
            maxLength="16"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>CVV:</label>
          <input
            type="password"
            maxLength="4"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Pay Now</button>
      </form>
    );
  }

  export default PaymentForm;
