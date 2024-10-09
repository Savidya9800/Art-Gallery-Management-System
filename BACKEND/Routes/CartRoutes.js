const express = require('express');
const CartController = require('../Controllers/CartController');
const cartrouter = express.Router();

cartrouter.post('/add', CartController.addItemToCart);
cartrouter.get('/', CartController.getCartItems);
cartrouter.put('/update/:id', CartController.updateItemQuantity);
cartrouter.delete('/remove/:id', CartController.removeItemFromCart);

module.exports = cartrouter;
