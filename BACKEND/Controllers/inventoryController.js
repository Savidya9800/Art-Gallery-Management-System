const Inventory = require("../Models/inventoryModel");

const getAllInventory = async (req, res) => {

    let inventory;
    //get all Inventory
    try{
        inventory = await Inventory.find();

    }catch (err){
        console.log(err);
    }
    //not Found
    if(!inventory){
        return res.status(400).json({message:"Inventory not found"});
    }
    //Display all inventories
    return res.status(200).json({ inventory });
};

//data insert
const addInventory = async (req, res, next) => {
    const {productname,price,itemCount,date}= req.body;

    let inventory;

    try{
        inventory = new Inventory({productname,price,itemCount,date});
        await inventory.save();
    }catch(err) {
        console.log(err);
    }
    //not insert inventory
    if(!inventory){
        return res.status(404).json({message:"unable to add inventory"});
        }
        return res.status(200).json({ inventory });
};

//get by id
const getByID = async (req, res, next)=>{

    const id = req.params.id;

    let inventory;

    try{
        inventory = await Inventory.findById(id);
        }catch(err) {
            console.log(err);
                }

    //not available inventory
    if(!inventory){
        return res.status(404).json({message:"Inventory not found"});
        }
        return res.status(200).json({ inventory });
};

//update inventory details
const updateInventory = async (req,res,next) => {

    const id = req.params.id;
    const {productname,price,itemCount,date}= req.body;

    let inventory;

    try{
        inventory = await Inventory.findByIdAndUpdate(id,
            {productname:name,price: Number, itemCount:Number,date:date});
            inventory = await inventory.save();
    }catch(err) {
        console.log(err);
            }

    if(!inventory){
        return res.status(404).json({message:"unable to update user Details"});
        }
        return res.status(200).json({ inventory });

};
// delete inventory details
const deleteInventory = async (req,res,next) =>{
    const id = req.params.id;

    let inventory; 

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!inventory){
        return res.status(404).json({message:"unable to delete user Details"});
        }
        return res.status(200).json({ inventory });
};


exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getByID = getByID;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;