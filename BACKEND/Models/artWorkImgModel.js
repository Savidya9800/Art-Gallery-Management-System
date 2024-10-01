const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImgSchema = new Schema({
  image: {
    type: String, //dataType
    required: true, //validation
  },
}, { timestamps: true });

module.exports = mongoose.model(
  "ArtworkImage", //file name
  ImgSchema //function name
);
