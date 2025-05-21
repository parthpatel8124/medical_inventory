const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const itemsRoutes = require("./routes/itemRoutes");
const settingsRoutes = require("./routes/settingsRoutes.js");
const cartRoutes = require("./routes/cartRoutes"); // Add cart routes
const cron = require("node-cron");
const expiredRoutes = require("./routes/expiredRoutes.js");
const { moveExpiredItems } = require("./controllers/expiredItemController.js");

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
};

// Correct middleware order
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));  // Allows JSON request body parsing
app.use(express.urlencoded({ extended: true }));  // Allows URL-encoded form data
app.use("/uploads", express.static("uploads"));// Serve static files for uploaded images

// Run this function every day at midnight (00:00)
cron.schedule("0 0 * * *", () => {
  console.log("Checking for expired items...");
  moveExpiredItems();
});

//  Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// Routes (remove duplicate cart routes)
app.use("/api/cart", cartRoutes);
app.use("/api/expired-items", expiredRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/settings", settingsRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
