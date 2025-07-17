const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3002;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/shipping_dashboard")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// MongoDB Schema
const statusChangeSchema = new mongoose.Schema({
  cardId: String,
  userName: String,
  statusChanges: Number,
  date: String, // Format: YYYY-MM-DD
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StatusChange = mongoose.model("StatusChange", statusChangeSchema);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to Shipping Analytics API!");
});

// ➕ Add new status change
app.post("/api/status/add", async (req, res) => {
  const { cardId, userName, statusChanges, date } = req.body;
  try {
    const newChange = new StatusChange({ cardId, userName, statusChanges, date });
    await newChange.save();
    res.status(201).json({ message: "Status change added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📊 Analytics summary
app.get("/api/analytics/summary", async (req, res) => {
  try {
    const all = await StatusChange.find();
    const totalStatusChanges = all.reduce((sum, e) => sum + e.statusChanges, 0);
    const uniqueUsers = new Set(all.map((e) => e.userName));
    const uniqueCards = new Set(all.map((e) => e.cardId));

    // Group by date
    const dailyUserMap = {};
    all.forEach(({ date, userName }) => {
      if (!dailyUserMap[date]) dailyUserMap[date] = new Set();
      dailyUserMap[date].add(userName);
    });

    const dailyActiveUsers = Object.entries(dailyUserMap).map(([date, users]) => ({
      date,
      users: users.size,
    }));

    const averageDAU = dailyActiveUsers.length > 0
      ? (dailyActiveUsers.reduce((sum, e) => sum + e.users, 0) / dailyActiveUsers.length).toFixed(2)
      : "0";

    // Get recent activity with proper date formatting
    const recentActivity = (await StatusChange.find()
      .sort({ createdAt: -1 })
      .limit(10))
      .map(item => ({
        ...item._doc,
        date: new Date(item.date).toISOString().split('T')[0], // Format date as YYYY-MM-DD
        createdAt: item.createdAt.toISOString()
      }));

    res.json({
      totalActiveUsers: uniqueUsers.size,
      totalStatusChanges,
      uniqueCards: uniqueCards.size,
      averageDAU,
      dailyActiveUsers,
      recentActivity,
    });
  } catch (err) {
    console.error('Error in /api/analytics/summary:', err);
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get history with optional filters
app.get("/api/status/changes", async (req, res) => {
  const { startDate, endDate, cardId, userName } = req.query;
  const filter = {};

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = startDate;
    if (endDate) filter.date.$lte = endDate;
  }

  if (cardId && cardId !== "All") filter.cardId = cardId;
  if (userName) filter.userName = new RegExp(userName, "i"); // partial match

  try {
    const results = await StatusChange.find(filter);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve React/Frontend for any other routes (except API routes)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    // If API route not found, send 404 JSON response
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
