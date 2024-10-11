const express = require("express");
const router = express.Router();

//model inseting is here 
const inquiryM = require('../Models/InquiryModel');
//controller inserting is here
const inquiryC = require('../Controllers/InquiryController');


//model inserting is here 
//controller inserting is here.

router.get("/", inquiryC.getAllInquiries); //Get All Inquiries
router.post("/", inquiryC.addInquiry); //Insert new Inquiries
router.post("/:id",  inquiryC.getInquiryById); //Get Inquiry by ID
router.post("/i/:email",  inquiryC.getInquiryByEmail); //Get Inquiry by ID
router.put("/:id", inquiryC.updateInquiry); //Update Inquiry
router.delete("/:id", inquiryC.deleteInquiry); //Delete Inquiry



module.exports = router;
