const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  pdf: {
    type: String, //dataType
    required: true, //validation
  },
});

module.exports = mongoose.model(
  "PaymentReceipt", //file name
  pdfSchema //function name
);
