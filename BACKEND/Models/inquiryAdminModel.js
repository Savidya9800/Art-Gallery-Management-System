const { response } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InquiryAdminSchema = new Schema({

  
   
    response: {
        type: String,
        required: true
    },
    inquirystatus: {
        type: String,
        required:true
    },
    
  
});

module.exports = mongoose.model('InquiryAdminModel', InquiryAdminSchema);


