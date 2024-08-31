const express = require("express");
const router = express.Router();

//model inseting is here 
const inquiryM = require('../Models/InquiryModel');
//controller inserting is here
const inquiryC = require('../Controllers/InquiryController');

router.get("/",inquiryC.getAllInquiries); //Get All Inquiries
router.post("/",inquiryC.addInquiries); //Insert new Inquiries
<<<<<<< Updated upstream
router.get("/:id",inquiryC.getInquiryById); //Get Inquiry by ID
router.put("/:id",inquiryC.updateInquiry); //Updatee Inquiry
router.delete("/:id",inquiryC.deleteInquiry); //Delete Inquiry
=======
router.get("/:id",inquiryC.getInquiryById); //Insert new Inquiries
router.put("/:id",inquiryC.updateInquiry); //Update Inquiries
router.delete("/:id",inquiryC.deleteInquiry); //Delete Inquiries
>>>>>>> Stashed changes

module.exports = router;