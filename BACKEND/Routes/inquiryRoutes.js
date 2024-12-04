const express = require("express");
const router = express.Router();

const { sendEmail } = require("../Services/email/emailService"); 
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


router.post("/", async (req, res) => {
    const { name, email, date, inquiryType, inquiryMessage } = req.body; // Destructure inquiry data from request body
    
    
    try {
        // Save the inquiry to the database
        const newInquiry = new inquiryM({
            name,
            email,
            date,
            inquiryType,
            inquiryMessage
        });
        await newInquiry.save();
        console.log(newInquiry);
        
        // Send a confirmation email after saving
        await sendEmail(email, 'Inquiry Confirmation', 'Thank you for your inquiry! We will get back to you shortly.');
        
        // Respond with success message
        res.status(201).send({ message: 'Inquiry created and email sent.' });
    } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        res.status(500).send({ message: 'Inquiry created, but error sending email.', error: error.message });
    }
});



module.exports = router;
