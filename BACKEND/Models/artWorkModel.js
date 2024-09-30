const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artWorkSchema = new Schema({
  name: {
    type: String, //dataType
    required: true, //validation
  },
  email: {
    type: String,
    required: true,
  },
  pNumber: {
    type: Number,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    //required: true
  },
  place: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    //required: true
  },

  accepted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "ArtWork", //file name
  artWorkSchema //function name
);
