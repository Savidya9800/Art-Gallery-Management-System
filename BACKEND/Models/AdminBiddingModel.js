const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addBidArtSchema = new Schema({
    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    artistName:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
    },

    startDate:{
        type:Date,
        required:true,
    },

    endDate:{
        type:Date,
        required:true,
    },

    minPrice:{
        type:Number,
        required:true,
    },

    image:{
        type:String,
        required:false,
    },

    })

    module.exports = mongoose.model(
        "AdminBiddingModel", //file name
        addBidArtSchema //function name
    )