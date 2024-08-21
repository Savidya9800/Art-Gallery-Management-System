const artWork = require('../Models/artWorkModel');

//Data Display
const getAllArtWorks = async (req, res) => {
    let artWorks;

    //Get all artWorks
    try{
        artWorks = await artWork.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!artWorks){
        return res.status(404).json({message: "No artWorks found"});
    }

    //Display all artWorks
    return res.status(200).json({artWorks});
};

//Data Insert
const addArtWorks = async (req,res, next) => {

    const {title, category, artist, year, price, img} = req.body;

    let artWorks;

    try{
        artWorks = new artWork({
            title,
            category,
            artist,
            year,
            price,
            img
        });
        await artWorks.save();
    }catch (err) {
        console.log(err);
    }

    //not insert artWorks
    if(!artWorks){
        return res.status(404).json({message: "Unable to add artWorks"});
    }
    return res.status(200).json({artWorks});
};

//Get by Id
const getById = async (req, res) => {
    const id = req.params.id;

    let artWorks;

    try{
        artWorks = await artWork.findById(id);
    }catch (err) {
        console.log(err);
    }

    //not available artWorks
    if(!artWorks){
        return res.status(404).json({message: "Artwork Not Found"});
    }
    return res.status(200).json({artWorks});
};

//Update artwork Details
const updateArtWork = async (req, res, next) => {
    const id = req.params.id;
    const {title, category, artist, year, price, img} = req.body;

    let artworks;

    try{
        artworks = await artWork.findByIdAndUpdate(id,
            {title, category, artist, year, price, img});
            artworks = await artworks.save();       
    }catch(err){
        console.log(err);
    } 
    if(!artworks){
        return res.status(404).json({message: "Artwork Not Found"});
    }
    return res.status(200).json({artworks});
};

//Delete artwork
const deleteArtWork = async (req, res, next) => {
    const id = req.params.id;

    let artworks;

    try{
        artworks = await artWork.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!artworks){
        return res.status(404).json({message: "Unable to Delete Artwork Details"});
    }
    return res.status(200).json({artworks});
};

exports.getAllArtWorks = getAllArtWorks;
exports.addArtWorks = addArtWorks;
exports.getById = getById;
exports.updateArtWork = updateArtWork;
exports.deleteArtWork = deleteArtWork;

