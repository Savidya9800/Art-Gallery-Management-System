const InquiryAdmin = require('../Models/inquiryAdminModel');

const getAllResponses = async (req, res) => {

    let responseData;

    try {
        responseData = await InquiryAdmin.find();
    } catch (error) {
        console.log(error);
    }

    if(!responseData) // if no responses founded 
    {
        return res.status(404).send("No responses found");
    }
    
    //Display responses 

    return res.status(200).json({responseData});


};

//Data insert 

const addResponse = async (req, res,next) => {

    const { response, inquirystatus , inquiryID } = req.body; //Request data to body

    let createResponse;

    try {
        
        createResponse = new InquiryAdmin({ response, inquirystatus , inquiryID });
        await createResponse.save();
    }

    catch (error) {
        console.log(error);
    }

    //not insert data 

    if (!createResponse)
    {
        return res.status(500).send("Response not inserted");
    }

    else {
        return res.status(200).json({ createResponse });
    }
}

//get by response id 

const getResponseById = async (req, res,next) => {


    const id = req.params.id;

    let ResponseData;

    try {
        ResponseData = await InquiryAdmin.findById(id);

    } catch (error) {
        console.log(error);
    } 
    
    //if available response 
    if (!ResponseData){
        return res.status(404).json({message:"Response not found"});
    }
    
    return res.status(200).json({ResponseData});
}



//update response

const updateResponse = async (req, res,next) => {

    const id = req.params.id;
    const { response, inquirystatus, inquiryID } = req.body;

    let updateResponse;

    try {
        updateResponse = await InquiryAdmin.findByIdAndUpdate(id, { response, inquirystatus,inquiryID });

        updateResponse = await InquiryAdmin.findById(id);
    }catch (error) {
        console.log(error);
    }

    if (!updateResponse){
        return res.status(404).json({message:"Unable to update response"});
    }
    return res.status(200).json({updateResponse});
};

//Data response

const deleteResponse = async (req, res,next) => {

    const id = req.params.id;

    let deleteResponse;

    try {
        deleteResponse = await InquiryAdmin.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }

    if (!deleteResponse){
        return res.status(404).json({message:"Unable to delete response"});
    }
    return res.status(200).json({deleteResponse});
};


const getResponseByInquiryID = async (req, res) => {
    const { inquiryID } = req.params; // Extract inquiryId from request parameters

    try {
        // Find all responses related to the given inquiryId
        const responses = await InquiryAdmin.find({ inquiryID });

        if (responses.length > 0) {
            res.status(200).json({ Responses: responses });
        } else {
            res.status(200).json({ Responses: [] }); // Return an empty array if no responses found
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch responses' });
    }
};



exports.getAllResponses = getAllResponses;
exports.addResponse = addResponse;
exports.getResponseById = getResponseById;
exports.updateResponse = updateResponse;
exports.deleteResponse = deleteResponse;
exports.getResponseByInquiryID = getResponseByInquiryID;
