import React, { useEffect, useState } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch menu items from backend
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:3000/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading menu...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div style={styles.wrapper}>
      <main style={styles.content}>
        <h1 style={styles.title}>Explore Our Menu</h1>
        <div style={styles.grid}>
          {menuItems.map((item) => (
            <div key={item._id} style={styles.card}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <h2 style={styles.name}>{item.name}</h2>
              <p style={styles.description}>{item.description || item.cuisine}</p>
              <p style={styles.price}>R{item.price || "N/A"}</p>
              <button style={styles.button}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>

      <footer style={styles.footer}>
        © 2025 Q-Foodies. All rights reserved.
      </footer>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0f1115",
    color: "#e9ecf1",
    fontFamily: "Inter, sans-serif",
  },
  content: {
    flex: 1,
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#ff7a59",
    fontSize: "2.5rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#1a2233",
    borderRadius: 16,
    padding: "1.5rem",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "1rem",
  },
  name: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#ffd166",
  },
  description: {
    fontSize: "1rem",
    color: "#b0b7c3",
    margin: "0.5rem 0",
  },
  price: {
    fontWeight: "bold",
    color: "#4ade80",
    marginBottom: "0.8rem",
  },
  button: {
    padding: "0.6rem 1rem",
    background: "linear-gradient(90deg, #0074d9 0%, #ff7a59 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  footer: {
    textAlign: "center",
    padding: "1rem",
    background: "linear-gradient(90deg, #0074d9, #ff7a59)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};

export default Menu;
