const inquiry = require('../Models/InquiryModel');


// Display part 
const getAllInquiries = async (req, res) => {

    let inquiryData;  //Remember the variable declare in here this is for the display of the data
    try {
        inquiryData = await inquiry.find();
    } catch (error) {
        console.log(err);
    }

    if (!inquiryData) {
        return res.status(404).json({message: 'No Inquiry Found'})
    }

    return res.status(200).json({inquiryData});

};

//data insert part

const addInquiries = async (req, res) => {

    const {name,email,inquiryType,inquiryMessage} = req.body;

    let newInquiry;

    try {
        newInquiry = new inquiry({name,email,inquiryType,inquiryMessage});
        await newInquiry.save();
    } catch (err){
        console.log(err);
    }

    if (!newInquiry){
        return res.status(404).json({message: 'Unable to add Inquiry'});

    } 
    return res.status(200).json({newInquiry});
};

//Get by ID
const getInquiryById = async (req, res) => {

    const id = req.params.id;

    let inquiryData;

    try {
        inquiryData = await inquiry.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!inquiryData){
        return res.status(404).json({message: 'Inquiry not found'});
    }

    return res.status(200).json({inquiryData});
};

//Update part

const updateInquiry = async (req, res, next) => {

    const id = req.params.id;

    const {name,email,inquiryType,inquiryMessage} = req.body;

    let inquiryData;

    try {
        inquiryData = await inquiry.findByIdAndUpdate(id,
            {name,email,inquiryType,inquiryMessage});
            inquiryData = await inquiryData.save();
    
    } catch (err) {
        console.log(err);
    }

    if (!inquiryData){
        return res.status(404).json({message: 'Cant update Inquiry'});
    }
    return res.status(200).json({inquiryData});
};

//Delete Inquiry

const deleteInquiry = async (req, res) => {

    const id = req.params.id;

    let inquiryData;

    try {
        inquiryData = await inquiry.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!inquiryData){
        return res.status(404).json({message: 'Cant delete Inquiry'});
    }

    return res.status(200).json({message: 'Inquiry Deleted'});
};


exports.getAllInquiries = getAllInquiries;
exports.addInquiries = addInquiries;
exports.getInquiryById = getInquiryById;
exports.updateInquiry = updateInquiry;
exports.deleteInquiry = deleteInquiry;
