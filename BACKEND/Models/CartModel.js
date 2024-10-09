
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
