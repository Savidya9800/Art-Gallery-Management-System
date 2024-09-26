const Adminbid = require('../Models/AdminBiddingModel');
//display
const getAllAdminBidding = async (req, res, next) => {

    let adminAddBid;

    try{
        adminAddBid = await Adminbid.find();
    }catch(err)
    {
        console.log(err);
    }

    //not found
    if(!adminAddBid){
        return res.status(404).json({message: "No Bid work found"});
    }
    //Dispaly all  added bid work
    return res.status(200).json({adminAddBid});
}

//data insert
const addBidArt = async (req, res, next) =>{

    const {title, description, artistName, category, startDate, endDate, minPrice} = req.body;

    let bidArtadd;

    try{
        bidArtadd = new Adminbid({title, description, artistName, category, startDate, endDate, minPrice});
        await bidArtadd.save();
    }catch{
        console.log(err);
    }

    //if not inserted
    if(!bidArtadd){
        return res.status(404).json({message: "Unable to add Bid work"});
    }
    return res.status(200).json({bidArtadd});


}

//get by Id
const getBidArtById = async (req, res, next) =>{
    const bidId = req.params.bidId;

    let bidArt;

    try{
        bidArt = await Adminbid.findById(bidId);

    }catch{
        console.log(err);
    }

    //if not found
    if(!bidArt){
        return res.status(404).json({message: "Bid Art not found"});
    }
    return res.status(200).json({bidArt});
    

}

//update
const updateBidArt = async(req, res, next) => {

    const bidId = req.params.bidId;
    const {title, description, artistName, category, startDate, endDate, minPrice} = req.body;

    let updateArtBid;

    try{
        updateArtBid = await Adminbid.findByIdAndUpdate(bidId,{
            title: title, description: description, artistName: artistName, category: category, startDate: startDate, endDate: endDate, minPrice: minPrice });
            updateArtBid = await updateArtBid.save();
       

    }catch{
        console.log(err);
    }

    if(!updateArtBid){
        return res.status(404).json({message: "Bid Art not updated"});
    }
    return res.status(200).json({updateArtBid});
    
}

//delete
const deleteBidArt = async(req, res, next) => {
    const bidId = req.params.bidId;

    let deleteArtBid;

    try{

        deleteArtBid = await Adminbid.findByIdAndDelete(bidId);

    }catch{
        console.log(err);

    }

    if(!deleteArtBid){
        return res.status(404).json({message: "Bid Art unable to delete"});
    }
    return res.status(200).json({deleteArtBid});

}



//exports of every crud 
exports.getAllAdminBidding = getAllAdminBidding;
exports.addBidArt = addBidArt;
exports.getBidArtById = getBidArtById;
exports.updateBidArt = updateBidArt;
exports.deleteBidArt = deleteBidArt;