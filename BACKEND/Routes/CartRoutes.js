const express = require('express');
const CartController = require('../Controllers/CartController');
const cartrouter = express.Router();

cartrouter.post('/add', CartController.addItemToCart);
cartrouter.get('/', CartController.getCartItems);
cartrouter.put('/update/:productId', CartController.updateItemQuantity);
cartrouter.delete('/remove/:productId', CartController.removeItemFromCart);

module.exports = cartrouter;
