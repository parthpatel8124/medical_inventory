const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  recommendedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  score: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
