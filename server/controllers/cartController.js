const Cart = require("../models/Cart");
const Item = require("../models/Item");
const PurchaseHistory = require("../models/PurchaseHistory");

const addToCart = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { itemId, quantity } = req.body;

    // Find item
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check stock
    if (item.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Find or create cart
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [], totalAmount: 0 });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(i => i.itemId.toString() === itemId);

    if (existingItemIndex > -1) {
      // Update existing cart item
      const newQuantity = cart.items[existingItemIndex].quantity + parseInt(quantity);
      if (item.quantity < newQuantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      cart.items.push({
        itemId: item._id,
        name: item.name,
        quantity: parseInt(quantity),
        price: item.price,
        image: item.image
      });
    }

    // Update item stock in inventory
    item.quantity -= parseInt(quantity);
    await item.save();

    // Update cart total and save
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await cart.save();

    // Fetch the updated item to confirm stock update
    const updatedItem = await Item.findById(itemId);
    console.log("Updated stock:", updatedItem.quantity);

    res.json({
      cart,
      updatedStock: updatedItem.quantity
    });

  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ items: [], totalAmount: 0 });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne();
    
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Return item to inventory
    const cartItem = cart.items.find(item => item.itemId.toString() === itemId);
    if (cartItem) {
      const item = await Item.findById(itemId);
      if (item) {
        item.quantity += cartItem.quantity;
        await item.save();
      }
    }

    // Remove from cart
    cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart" });
  }
};

const checkout = async (req, res) => {
  try {
    const { buyerName, buyerPhone, paymentMode } = req.body;
    const cart = await Cart.findOne();
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create purchase history records
    const purchases = cart.items.map(item => ({
      itemId: item.itemId,
      itemName: item.name,
      quantity: item.quantity,
      price: item.price,
      totalAmount: item.price * item.quantity,
      buyerName,
      buyerPhone,
      paymentMode
    }));

    await PurchaseHistory.insertMany(purchases);

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.json({ message: "Checkout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error during checkout" });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  checkout
};
