const express = require("express");
const router = express.Router();

//model inseting is here 
const inquiryM = require('../Models/InquiryModel');
//controller inserting is here
const inquiryC = require('../Controllers/InquiryController');

router.get("/",inquiryC.getAllInquiries); //Get All Inquiries
router.post("/",inquiryC.addInquiries); //Insert new Inquiries

module.exports = router;