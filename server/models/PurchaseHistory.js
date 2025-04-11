const mongoose = require("mongoose");

const PurchaseHistorySchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  itemName: String,
  quantity: Number,
  price: Number,
  totalAmount: Number,
  purchaseDate: { type: Date, default: Date.now },
  buyerName: { type: String, required: true },
  buyerPhone: { type: String, required: true },
  paymentMode: { type: String, required: true, enum: ['cash', 'card', 'upi'] }
});

const PurchaseHistory = mongoose.model("PurchaseHistory", PurchaseHistorySchema);

module.exports = PurchaseHistory;
