import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const styles = {
  footer: {
    width: "100vw",
    background: "linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)",
    color: "#fff",
    textAlign: "center",
    padding: "1.5rem 1rem",
    fontWeight: 500,
    fontSize: "0.95rem",
    
    left: 0,
    bottom: 0,
    zIndex: 99,
    height: 80,
  },
  links: {
    margin: "0.5rem 0",
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
  },
  social: {
    marginTop: "0.7rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    fontSize: "1.3rem",
  },
  smallText: {
    marginTop: "0.7rem",
    fontSize: "0.85rem",
    opacity: 0.8,
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <div>
        <p>🍴 Q-Foods – Bringing your favorite meals right to your doorstep</p>

        {/* Navigation Links */}
        <div style={styles.links}>
          <a href="/Homepage" style={styles.link}>Home</a>
          <a href="/About" style={styles.link}>About</a>
          <a href="/Contact" style={styles.link}>Contact</a>
          <a href="/Restaurants" style={styles.link}>Restaurants</a>
        </div>

        {/* Social Media Icons */}
        <div style={styles.social}>
          <a href="https://facebook.com/qfoods" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com/qfoods" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/qfoods" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com/company/qfoods" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>

        {/* Contact Info */}
        <p style={styles.smallText}>
          📧 support@qfoods.com | 📞 +27 11 123 4567
        </p>

        {/* Copyright */}
        <p style={styles.smallText}>
          &copy; {new Date().getFullYear()} Q-Foods. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
