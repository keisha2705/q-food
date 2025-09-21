import React, { useState } from 'react';

const banks = [
  'Nedbank',
  'PayPal',
  'FNB',
  'ABSA',
  'Standard Bank',
];

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    padding: "2rem",
    background: "linear-gradient(180deg, #1a2233 60%, #ff7a59 100%)",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    color: "#e9ecf1",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    margin: "0",
    boxSizing: "border-box",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.2rem',
    color: '#0074d9',
    fontWeight: 900,
    fontSize: '1.5rem',
    letterSpacing: '.5px',
  },
  label: {
    display: 'block',
    marginBottom: '.7rem',
    fontWeight: 700,
    color: '#ffd166',
  },
  input: {
    width: '100%',
    padding: '.7rem 1rem',
    borderRadius: 12,
    border: '1px solid #0074d9',
    background: '#f5f8fa',
    color: '#222',
    fontSize: '1rem',
    marginBottom: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '.7rem 1rem',
    borderRadius: 12,
    border: '1px solid #0074d9',
    background: '#f5f8fa',
    color: '#222',
    fontSize: '1rem',
    marginBottom: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '.8rem 1rem',
    borderRadius: 12,
    border: 'none',
    background: 'linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)',
    color: '#fff',
    fontWeight: 800,
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(0, 116, 217, .18)',
    transition: 'background .15s',
  },
  success: {
    textAlign: 'center',
    padding: '2rem',
    background: '#1a2233',
    borderRadius: 18,
    color: '#4ade80',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
    marginTop: '40px',
  }
};

function Checkout() {
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaid(true);
  };

  if (paid) {
    return (
      <div style={styles.success}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>
      <label style={styles.label}>
        Select Bank:
        <select
          value={bank}
          onChange={e => setBank(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">--Choose a bank--</option>
          {banks.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </label>
      <label style={styles.label}>
        Account Number:
        <input
          type="text"
          value={accountNumber}
          onChange={e => setAccountNumber(e.target.value)}
          required
          style={styles.input}
        />
      </label>
      <label style={styles.label}>
        Name on Account:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={styles.input}
        />
      </label>
      <button type="submit" style={styles.button}>Pay Now</button>
    </form>
  );
}

export default Checkout;