const Inquiry = require('../Models/InquiryModel');

// Get all inquiries
const getAllInquiries = async (req, res) => {
    
    let inquiryData;
    try {
        inquiryData = await Inquiry.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching inquiries' });
    }

    if (!inquiryData || inquiryData.length === 0) {
        return res.status(404).json({ message: 'No inquiries found' });
    }

    return res.status(200).json({ inquiryData });
};

// Add a new inquiry
const addInquiry = async (req, res) => {
    const { name, email, inquiryType, inquiryMessage } = req.body;

    let newInquiry;
    try {
        newInquiry = new Inquiry({
            
            name,
            email,
            inquiryType,
            inquiryMessage
        });
        await newInquiry.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error adding inquiry' });
    }

    return res.status(201).json({ newInquiry });
};

// Get an inquiry by ID
const getInquiryById = async (req, res) => {
    const id = req.params.id;

    let inquiryData;
    try {
        inquiryData = await Inquiry.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching inquiry' });
    }

    if (!inquiryData) {
        return res.status(404).json({ message: 'Inquiry not found' });
    }

    return res.status(200).json({ inquiryData });
};

// Get an inquiry by email
const getInquiryByEmail = async (req, res) => {
    const email = req.params.email; // Expecting email in the URL as a param
    console.log(email);

    let inquiryData;
    try {
        inquiryData = await Inquiry.find({ email: email }); // Find by email
        console.log(email, '2');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching inquiry' });
    }

    if (!inquiryData) {
        return res.status(404).json({ message: 'Inquiry not found' });
    }
    console.log(email, '3');
    return res.status(200).json({ inquiryData });
};


// Update an inquiry
const updateInquiry = async (req, res) => {
    const id = req.params.id;
    const { name, email, inquiryType, inquiryMessage } = req.body;

    let inquiryData;
    try {
        inquiryData = await Inquiry.findByIdAndUpdate(
            id,
            { name, email, inquiryType, inquiryMessage },
            { new: true } // Returns the updated document
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error updating inquiry' });
    }

    if (!inquiryData) {
        return res.status(404).json({ message: 'Unable to update inquiry' });
    }

    return res.status(200).json({ inquiryData });
};

// Get all inquiries by a specific ID (e.g., userID)
const getmyInquiries = async (req, res) => {
    const id = req.params.id;

    let inquiries;
    try {
        inquiries = await Inquiry.find({ userID: id }); // Adjust 'userID' based on your actual field
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching inquiries' });
    }

    if (!inquiries || inquiries.length === 0) {
        return res.status(404).json({ message: 'No inquiries found for the given ID' });
    }

    return res.status(200).json({ inquiries });
};

// Delete an inquiry
const deleteInquiry = async (req, res) => {
    const id = req.params.id;

    let inquiryData;
    try {
        inquiryData = await Inquiry.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting inquiry' });
    }

    if (!inquiryData) {
        return res.status(404).json({ message: 'Unable to delete inquiry' });
    }

    return res.status(200).json({ message: 'Inquiry deleted successfully' });
};




// Exporting the functions in here
exports.getAllInquiries = getAllInquiries;
exports.addInquiry = addInquiry;
exports.getInquiryById = getInquiryById;
exports.getInquiryByEmail = getInquiryByEmail;
exports.updateInquiry = updateInquiry;
exports.getmyInquiries = updateInquiry;
exports.deleteInquiry = deleteInquiry;






