const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    productname: {
        type: String, // data type
        required: true, // validation
    },
    price: {
        type: Number, // data type
        required: true, // validation
    },
    itemCount: {
        type: Number, // data type
        required: true, // validation
    },
    date: {
        type: Date, // data type
        required: true, // validation
    },
    image: {
        type: String, // data type
        required: false, // not required, as some items may not have an image
    }
});

module.exports = mongoose.model(
    "inventoryModel", // model name
    inventorySchema // schema
);