const mongoose = require("mongoose");

const PurchaseHistorySchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  itemName: String,
  quantity: Number,
  price: Number,
  totalAmount: Number,
  purchaseDate: { type: Date, default: Date.now }
});

const PurchaseHistory = mongoose.model("PurchaseHistory", PurchaseHistorySchema);

module.exports = PurchaseHistory;
