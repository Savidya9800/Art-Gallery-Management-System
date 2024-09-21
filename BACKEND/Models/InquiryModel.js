const { response } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Document table is here 
const InquirySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    },
    inquiryType: {
        type:String,
        required: true
    },
    
    inquiryMessage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Inquiry', InquirySchema);


