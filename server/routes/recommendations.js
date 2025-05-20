const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Simple recommendation based on price similarity
router.get('/:itemId', async (req, res) => {
  try {
    const baseItem = await Item.findById(req.params.itemId);
    if (!baseItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find items with similar price (±20%)
    const recommendations = await Item.find({
      _id: { $ne: baseItem._id },
      price: {
        $gte: baseItem.price * 0.8,
        $lte: baseItem.price * 1.2
      }
    }).limit(4);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations' });
  }
});

// Get popular items as default recommendations
router.get('/', async (req, res) => {
  try {
    const recommendations = await Item.find()
      .sort('-quantity')
      .limit(4);
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations' });
  }
});

module.exports = router;
