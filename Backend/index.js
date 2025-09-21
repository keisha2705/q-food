// =======================
// 📦 Dependencies
// =======================
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const base64 = require("base-64");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// =======================
// 🌐 MongoDB Connection
// =======================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Q-FOODS",
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =======================
// 🔐 User Schema & Auth
// =======================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // base64-encoded
});

const User = mongoose.model("User", userSchema);

// --- Signup ---
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const encodedPassword = base64.encode(password);

    const newUser = new User({ username, email, password: encodedPassword });
    await newUser.save();

    return res.status(201).json({ message: "✅ User registered successfully" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// --- Login ---
app.post("/login", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res
        .status(401)
        .json({ error: "Missing or invalid Authorization header" });
    }

    const base64Credentials = authHeader.split(" ")[1];
    const decodedCredentials = base64.decode(base64Credentials);
    const [username, password] = decodedCredentials.split(":");

    const user = await User.findOne({ username });
    if (!user || base64.decode(user.password) !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.status(200).json({
      message: "✅ Login successful",
      username: user.username,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// =======================
// 🍽 Restaurants
// =======================
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error("❌ Fetch restaurants error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const restaurant = new Restaurant({ name, description, image });
    await restaurant.save();
    res.status(201).json({ message: "✅ Restaurant created" });
  } catch (err) {
    console.error("❌ Create restaurant error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =======================
// 📦 Orders
// =======================
const orderSchema = new mongoose.Schema({
  username: String,
  items: [
    {
      restaurantId: mongoose.Schema.Types.ObjectId,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Place order
app.post("/orders", async (req, res) => {
  try {
    const { username, items, total } = req.body;
    const order = new Order({ username, items, total });
    await order.save();
    res.status(201).json({ message: "✅ Order placed successfully" });
  } catch (err) {
    console.error("❌ Create order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user orders
app.get("/orders/:username", async (req, res) => {
  try {
    const orders = await Order.find({ username: req.params.username });
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =======================
// 💳 Checkout
// =======================
app.post("/checkout", async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = "paid";
    await order.save();

    res.json({ message: "✅ Payment successful", orderId });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =======================
// 📍 Location
// =======================
const locationSchema = new mongoose.Schema({
  username: String,
  address: String,
  lat: Number,
  lng: Number,
});

const Location = mongoose.model("Location", locationSchema);

// Save location
app.post("/location", async (req, res) => {
  try {
    const { username, address, lat, lng } = req.body;
    const location = new Location({ username, address, lat, lng });
    await location.save();
    res.status(201).json({ message: "✅ Location saved" });
  } catch (err) {
    console.error("❌ Save location error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get user location
app.get("/location/:username", async (req, res) => {
  try {
    const location = await Location.findOne({ username: req.params.username });
    if (!location)
      return res.status(404).json({ error: "Location not found" });
    res.json(location);
  } catch (err) {
    console.error("❌ Get location error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// =======================
// 🚀 Start Server
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
