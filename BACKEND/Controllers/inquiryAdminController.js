const InquiryAdmin = require('../Models/inquiryAdminModel');

const getAllResponses = async (req, res) => {

    let getAllResponses;

    try {
        getAllResponses = await InquiryAdmin.find();
    } catch (error) {
        console.log(error);
    }

    if(!getAllResponses) // if no responses founded 
    {
        return res.status(404).send("No responses found");
    }
    
    //Display responses 

    return res.status(200).json({getAllResponses});


};

exports.getAllResponses = getAllResponses;
