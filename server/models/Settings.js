const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  theme: { type: String, default: "light" }, // Light/Dark Mode
  language: { type: String, default: "en" }, // Language Selection
  lowStockThreshold: { type: Number, default: 5 }, // Inventory Customization
  expiryNotificationDays: { type: Number, default: 7 },
  sortingMethod: { type: String, default: "name" }, // Default Sorting Method
  notificationsEnabled: { type: Boolean, default: true },
  emailAlerts: { type: Boolean, default: false },
  notificationSound: { type: String, default: "default" },
  smartRestocking: { type: Boolean, default: false },
  auditLog: [{ type: String }], // Store actions history
  barcodeScannerEnabled: { type: Boolean, default: true },
  currency: { type: String, default: "USD" }, // Currency Setting
  lastUpdated: { type: Date, default: Date.now } // Last Updated Timestamp
});

const Settings = mongoose.model("Settings", SettingsSchema);

module.exports = Settings;
