import React, { useEffect, useState } from 'react';

const Orders = ({ username }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders from backend for the logged-in user
        const response = await fetch(`http://localhost:3000/orders/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchOrders();
    }
  }, [username]);

  if (!username) return <p>Please log in to see your orders.</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Customer</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={tdStyle}>{order._id}</td>
                <td style={tdStyle}>{order.username}</td>
                <td style={tdStyle}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={tdStyle}>{order.status}</td>
                <td style={tdStyle}>R{order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { borderBottom: '1px solid #ccc', textAlign: 'left', padding: '8px' };
const tdStyle = { borderBottom: '1px solid #eee', padding: '8px' };

export default Orders;
