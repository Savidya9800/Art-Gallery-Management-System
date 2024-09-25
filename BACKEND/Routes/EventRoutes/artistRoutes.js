const express = require('express');
const { registerArtist, loginArtist } = require('../../Controllers/EventController/Artist_Controller');

const router = express.Router();

// Define the route for registering a new artist
router.post('/register', registerArtist);

// Define the route for logging in an artist
router.post('/login', loginArtist);

module.exports = router;
