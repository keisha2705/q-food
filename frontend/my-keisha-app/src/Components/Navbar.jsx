import React from "react";
import { Link, useLocation } from "react-router-dom";

const styles = {
  navbar: {
    width: "100vw",
    background: "linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)",
    padding: "0.7rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 12px rgba(0,116,217,0.10)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    fontWeight: 900,
    fontSize: "1.5rem",
    color: "#ffd166",
    letterSpacing: "2px",
    textShadow: "0 2px 8px #0074d9",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  link: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
    padding: "0.4rem 1rem",
    borderRadius: "8px",
    transition: "background .15s, color .15s",
  },
  linkActive: {
    background: "#ffd166",
    color: "#1a2233",
  },
};

const navItems = [
  { to: "/Homepage", label: "Home" },
  { to: "/Restaurant", label: "Restaurants" },
  { to: "/Menu", label: "Menu" },
  { to: "/Orders", label: "Orders" },
  { to: "/Cart", label: "Cart" },
  { to: "/Checkout", label: "Checkout" },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.navbar}>
      <Link to="/Homepage" style={styles.brand}>
        Q-FOODS
      </Link>
      <div style={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              ...styles.link,
              ...(location.pathname === item.to ? styles.linkActive : {}),
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;