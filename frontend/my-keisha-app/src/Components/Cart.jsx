import { Link } from "react-router-dom";

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    padding: "2rem",
    borderRadius: "18px",
    background: "linear-gradient(180deg, #1a2233 60%, #ff7a59 100%)",
    color: "#e9ecf1",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    margin: "0",
    boxSizing: "border-box",
  },
  title: {
    color: "#ff6347",
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ff6347",
  },
  total: {
    marginTop: "20px",
    fontWeight: "bold",
  },
  checkoutBtn: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#ff6347",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  links: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  link: {
    color: "#ff6347",
    textDecoration: "none",
    fontWeight: "500",
  },
};

function Cart() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛒 Your Cart</h1>

      {/* Example cart items */}
      <div style={styles.cartItem}>
        <p style={styles.itemName}>🍔 Cheeseburger</p>
        <p style={styles.itemQty}>Qty: 2</p>
      </div>

      <div style={styles.cartItem}>
        <p style={styles.itemName}>🍕 Margherita Pizza</p>
        <p style={styles.itemQty}>Qty: 1</p>
      </div>

      {/* Total & Checkout */}
      <div style={styles.total}>
        <p>Total: R25.50</p>
        <Link to="/checkout" style={styles.checkoutBtn}>
          Proceed to Checkout
        </Link>
      </div>

      {/* Navigation links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </div>
  );
}

export default Cart;
