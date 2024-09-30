const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    productname:{
        type:String,//data type
        required:true,//validate
    },

    price:{
        type:Number,//data type
        required:true,//validate
    },

    itemCount:{
        type:Number,//data type
        required:true,//validate
    },

    date:{
        type:Date,//data type
        required:true,//validate
    }
});

module.exports = mongoose.model(
    "inventoryModel",//file name
    inventorySchema//function name
)