import React, { useState, useEffect } from "react";

const Restaurant = () => {
  const [restaurants, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      // Create Basic Auth header if credentials exist
      let headers = { "Content-Type": "application/json" };
      if (username && password) {
        const credentials = btoa(`${username}:${password}`);
        headers["Authorization"] = `Basic ${credentials}`;
        setIsAuthenticated(true);
      }

      const response = await fetch("http://localhost:3000/restaurants", {
        method: "GET",
        headers,
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setError("Session expired. Please log in again.");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Run fetch when component mounts
  useEffect(() => {
    fetchRestaurant();
  }, []);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRetry = () => {
    fetchRestaurant();
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ ...styles.container, ...styles.centerContent }}>
        <div style={styles.spinner}></div>
        <p>Loading restaurants...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ ...styles.container, ...styles.centerContent }}>
        <div style={styles.errorCard}>
          <h2 style={styles.errorTitle}>Oops!</h2>
          <p style={styles.errorMessage}>{error}</p>
          {!isAuthenticated ? (
            <button style={styles.button} onClick={handleLogin}>
              Go to Login
            </button>
          ) : (
            <button style={styles.button} onClick={handleRetry}>
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // No restaurants found
  if (restaurants.length === 0) {
    return (
      <div style={{ ...styles.container, ...styles.centerContent }}>
        <div style={styles.emptyState}>
          <h2>No restaurants found</h2>
          <p>Check back later for new restaurants in your area!</p>
          <button style={styles.button} onClick={handleRetry}>
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // Success state - show restaurants
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Restaurants Near You</h1>
        <button style={styles.refreshButton} onClick={handleRetry}>
          🔄 Refresh
        </button>
      </div>

      <div style={styles.grid}>
        {restaurants.map((r) => (
          <div key={r._id} style={styles.card}>
            <img
              src={r.image || "/placeholder-Restaurant.jpg"}
              alt={r.name}
              style={styles.image}
              onError={(e) => {
                e.target.src = "/placeholder-Restaurant.jpg";
              }}
            />
            <div style={styles.cardContent}>
              <h2 style={styles.name}>{r.name}</h2>
              <p style={styles.description}>{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    background: "#f9fafc",
    minHeight: "100vh",
    fontFamily: "Inter, sans-serif",
  },
  centerContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    color: "#ff6f91",
    fontSize: "2.5rem",
    margin: 0,
  },
  refreshButton: {
    background: "#1a73e8",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  cardContent: {
    padding: "1rem",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  name: {
    color: "#1a73e8",
    margin: "0 0 0.5rem 0",
    fontSize: "1.5rem",
  },
  description: {
    color: "#ff6f91",
    margin: "0",
    fontSize: "1rem",
    lineHeight: "1.4",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #ff6f91",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "1rem",
  },
  errorCard: {
    background: "white",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "400px",
  },
  errorTitle: {
    color: "#ff6f91",
    marginBottom: "1rem",
  },
  errorMessage: {
    color: "#666",
    marginBottom: "1.5rem",
  },
  emptyState: {
    background: "white",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "400px",
  },
  button: {
    background: "#ff6f91",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
  },
};

// CSS animation for spinner
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}

export default Restaurant;
