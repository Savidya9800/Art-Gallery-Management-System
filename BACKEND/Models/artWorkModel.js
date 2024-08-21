const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const artWorkSchema = new Schema({
    title: {
        type: String, //dataType
        required: true //validation
    },
    category: {
        type: String,
        required:true
    },
    artist: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ArtWork", //file name
     artWorkSchema //function name
    );