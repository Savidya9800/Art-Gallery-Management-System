const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema2 = new Schema({
  pdf: {
    type: String, //dataType
    required: true, //validation
  },
});

module.exports = mongoose.model(
  "Paymentreceipt", //file name
  pdfSchema2 //function name
);
