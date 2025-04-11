const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  checkout
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/remove/:itemId", removeFromCart);
router.post("/checkout", checkout);

module.exports = router;
