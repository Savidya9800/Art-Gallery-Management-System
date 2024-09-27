const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBidSchema = new Schema({
    name:{
        type:String, //dataType
        required:true, //validation
    },

    email: {
        type: String,
        required: true,
    },
    
    amount:{
        type: Number,
        required: true,
    }


})

module.exports = mongoose.model('Bidding', userBidSchema);//in case refer
