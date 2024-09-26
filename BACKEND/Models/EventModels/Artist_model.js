// models/Artist.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Artist model
const ArtistSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create and export the Artist model
const Artist = mongoose.model('artist', ArtistSchema);
module.exports = Artist;
