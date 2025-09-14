// index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: String,
  restaurantName: String,
  items: [String],
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);

// ROUTES

// Add restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all restaurants
app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.status(200).json(restaurants);
});

// Create an order
app.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// Update an order
app.put("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an order
app.delete("/orders/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Dummy restaurant loader route
app.post("/init-restaurants", async (req, res) => {
  const data = [
    { name: "KFC", location: "Rosebank", cuisine: "Fried Chicken" },
    { name: "McDonald's", location: "Sandton", cuisine: "Fast Food" },
    { name: "Simply Asia", location: "Midrand", cuisine: "Thai" },
    { name: "Panarottis", location: "Fourways", cuisine: "Pizza" },
    { name: "Piato", location: "Melrose Arch", cuisine: "Greek" },
    { name: "Spur", location: "Randburg", cuisine: "Grill" },
    { name: "Ocean Basket", location: "Bryanston", cuisine: "Seafood" },
    { name: "RocoMamas", location: "Parkhurst", cuisine: "Burgers" },
    { name: "Debonairs", location: "Alexandra", cuisine: "Pizza" }
  ];
  await Restaurant.insertMany(data);
  res.status(200).json({ message: "Restaurants added" });
});

app.listen(PORT, () => {
  console.log(`Q-foods backend running at http://localhost:${PORT}`);
});
