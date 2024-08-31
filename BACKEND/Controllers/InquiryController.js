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
}

exports.getAllInquiries = getAllInquiries;
exports.addInquiries = addInquiries;
