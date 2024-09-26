const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  pdf: {
    type: String, //dataType
    required: true, //validation
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "ArtworkImage", //file name
  pdfSchema //function name
);
