const CartItem = require('../Models/CartModel');
const Inventory = require('../Models/inventoryModel'); // Import the inventory model

// Add item to cart and update inventory stock
const addItemToCart = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    // Check if item exists in the inventory
    let inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    // Check if enough stock is available
    if (inventoryItem.itemCount < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Check if item already exists in the cart
    let cartItem = await CartItem.findOne({ id });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({ id, quantity });
    }

    // Save the cart item
    await cartItem.save();

    // Update inventory stock
    inventoryItem.itemCount -= quantity;
    await inventoryItem.save();

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

// Update item quantity in the cart and adjust inventory stock
const updateItemQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Find the cart item
    const cartItem = await CartItem.findOne({ id });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Find the inventory item
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    // Adjust inventory stock based on the change in quantity
    const quantityDifference = quantity - cartItem.quantity;
    if (inventoryItem.itemCount < quantityDifference) {
      return res.status(400).json({ message: 'Insufficient stock to update quantity' });
    }

    // Update cart item quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    // Update inventory stock
    inventoryItem.itemCount -= quantityDifference;
    await inventoryItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error });
  }
};

// Remove item from cart and restore stock in inventory
const removeItemFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the cart item
    const cartItem = await CartItem.findOneAndDelete({ id });

    if (cartItem) {
      // Restore stock in inventory
      let inventoryItem = await Inventory.findById(id);
      if (inventoryItem) {
        inventoryItem.itemCount += cartItem.quantity;
        await inventoryItem.save();
      }

      res.json({ message: 'Item removed from cart and stock updated' });
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
