import React from "react";

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 800px at 80% -10%, #1b2130 0%, #0074d9 40%)",
    color: "#e9ecf1",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 1rem",
  },
  card: {
    background: "#171b26",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontWeight: 900,
    fontSize: "1.6rem",
    color: "#ffd166",
    marginBottom: "1rem",
  },
  address: {
    fontSize: "1.1rem",
    marginBottom: "1.2rem",
    color: "#e9ecf1",
  },
  map: {
    width: "100%",
    height: "300px",
    border: "none",
    borderRadius: "14px",
    marginBottom: "1.2rem",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  },
  button: {
    background: "linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)",
    color: "#fff",
    fontWeight: 800,
    border: "none",
    fontSize: "1rem",
    borderRadius: 12,
    padding: "0.7rem 1.2rem",
    cursor: "pointer",
    marginTop: "0.5rem",
    transition: "background .15s",
  },
};

function Location() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.title}>Our Location</div>
        <div style={styles.address}>
          123 Main Street, Johannesburg, South Africa<br />
          Phone: +27 12 345 6789
        </div>
        <iframe
          title="Google Map"
          style={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.982123456789!2d28.047305315032!3d-26.204102983456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9509b1e6e6e6e6%3A0x123456789abcdef!2sJohannesburg!5e0!3m2!1sen!2sza!4v1680000000000!5m2!1sen!2sza"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <button style={styles.button} onClick={() => window.open("tel:+27123456789")}>
          Call Us
        </button>
      </div>
    </div>
  );
}

export default Location;