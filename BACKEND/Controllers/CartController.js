const CartItem = require('../Models/CartModel');

// Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    
    // Check if item already exists in the cart
    let cartItem = await CartItem.findOne({ id });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({ id, quantity });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
};

// Update item quantity
const updateItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({ id });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json(cartItem);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findOneAndDelete({ id });

    if (cartItem) {
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

module.exports = {
  addItemToCart,
  getCartItems,
  updateItemQuantity,
  removeItemFromCart,
};
