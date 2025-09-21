import React, { useState } from "react";

const mockDishes = [
  {
    _id: "1",
    name: "Classic Beef Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    rating: "4.7",
    price: 89,
  },
  {
    _id: "2",
    name: "Chicken Alfredo Pasta",
    image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    rating: "4.5",
    price: 120,
  },
  {
    _id: "3",
    name: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022",
    rating: "4.9",
    price: 190,
  },
  {
    _id: "4",
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1601924638867-3ec9a8435f9e",
    rating: "4.6",
    price: 99,
  },
  {
    _id: "5",
    name: "Spicy Ramen",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    rating: "4.8",
    price: 130,
  },
  {
    _id: "6",
    name: "Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    rating: "4.4",
    price: 95,
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f1115",
    color: "#e9ecf1",
    fontFamily: "Inter, sans-serif",
    paddingBottom: "4rem",
  },
  hero: {
    margin: "2rem auto",
    background: "linear-gradient(180deg, #111624, #0d1220)",
    border: "1px solid #1f283c",
    borderRadius: 18,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    maxWidth: "900px",
    padding: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
  },
  heroText: {
    flex: 1,
  },
  heroBtn: {
    background: "linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)",
    color: "#fff",
    fontWeight: 800,
    border: "none",
    boxShadow: "0 10px 24px rgba(0, 116, 217, .18)",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: 12,
    padding: "0.7rem 1.2rem",
    marginTop: "1rem",
  },
  heroImgWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  heroImg: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 14px 24px rgba(0,0,0,.35)",
    border: "1px solid #28324a",
  },
  section: {
    maxWidth: "900px",
    margin: "2rem auto",
    background: "#171b26",
    borderRadius: 18,
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
  },
  sectionTitle: {
    fontSize: "1.6rem",
    fontWeight: 800,
    marginBottom: "1.2rem",
    color: "#ffd166",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1.2rem",
  },
  card: {
    background: "#1a2233",
    borderRadius: 16,
    padding: "1rem",
    textAlign: "center",
    color: "#e9ecf1",
    boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
  },
  cardImg: {
    width: "100%",
    maxWidth: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "14px",
    margin: "0 auto 1rem",
    border: "1px solid #28324a",
    boxShadow: "0 6px 18px rgba(0,0,0,.18)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#ffd166",
  },
  cardMeta: {
    margin: "0.3rem 0",
    color: "#b4bacf",
    fontSize: "0.95rem",
  },
  btnAccent: {
    background: "linear-gradient(90deg, #0074d9 60%, #ff7a59 100%)",
    color: "#fff",
    fontWeight: 700,
    border: "none",
    borderRadius: 12,
    padding: "0.5rem 1rem",
    marginTop: "0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

const Homepage = () => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1>Hungry? It's Q delivered.</h1>
          <p>Fresh meals from your favourite spots—fast.</p>
          <button style={styles.heroBtn}>Order Now</button>
        </div>
        <div style={styles.heroImgWrapper}>
          <img
            style={styles.heroImg}
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Delicious food"
          />
        </div>
      </section>

      {/* Popular Dishes */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Popular Dishes</h2>
        <div style={styles.grid}>
          {mockDishes.map((dish) => (
            <div style={styles.card} key={dish._id}>
              <img style={styles.cardImg} src={dish.image} alt={dish.name} />
              <h3 style={styles.cardTitle}>{dish.name}</h3>
              <p style={styles.cardMeta}>⭐ {dish.rating} — R{dish.price}</p>
              <button style={styles.btnAccent} onClick={addToCart}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
