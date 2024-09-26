const bidding = require('../Models/BiddingModel');

//Data display
const getAllBidders = async (req, res) => {

    let Bidder;

    try{

        Bidder = await bidding.find();
    }catch (err) {
        console.log(err);
    }

    //if not found
    if(!Bidder){
        return res.status(404).json({message: "No Bidders found"});
    }
    return res.status(200).json({Bidder});
};


//data insert
const addBid = async (req, res) =>
{
    const {name, email, amount} = req.body; //request to body

    let newBidder;

    try{
        newBidder = new bidding({name, email, amount});
        await newBidder.save();
    }catch (err) {
        console.log(err);
    }

    //not inserted
    if(!newBidder){
        return res.status(404).json({message: "Unable to add Bid"});
    }

    return res.status(200).json({newBidder});


}

//get by id
const getById = async (req, res) => {

    const id = req.params.id; //get the id from the request

    let IDBidder;

    try{
        IDBidder = await bidding.findById(id);
    }catch (err) {
        console.log(err);
    }

    //if not found
    if(!IDBidder){
        return res.status(404).json({message: "Bidder not found"});
    }

    return res.status(200).json({IDBidder});

}
//update Bid
const updateBid = async (req, res) => {
    const id = req.params.id;
    const {name, email, amount} = req.body;

    let updateBidPlaced;

    try{
        updateBidPlaced = await bidding.findByIdAndUpdate(id, 
            { name: name, email:email, amount: amount });
            updateBidPlaced = await updateBidPlaced.save();
    }catch(err) {
        console.log(err);
    }

    if(!updateBidPlaced){
        return res.status(404).json({message: "Cannot update Bid"});
    }

    return res.status(200).json({updateBidPlaced});

}

//delete function
const deleteBid = async(req, res,next) => {
    const id = req.params.id;

    let deleteBidPlaced;

    try{
        deleteBidPlaced = await bidding.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    if(!deleteBidPlaced){
        return res.status(404).json({message: "unable to delete"});
    }

    return res.status(200).json({deleteBidPlaced});
}



//export to route
exports.getAllBidders = getAllBidders;
 //defined in the top
 exports.addBid = addBid;
 exports.getById = getById;
 exports.updateBid = updateBid;
 exports.deleteBid = deleteBid;
 
