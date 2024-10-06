const Inventory = require("../Models/inventoryModel");

const getAllInventory = async (req, res) => {

    let inventory;
    //get all Inventory
    try{
        inventory = await Inventory.find();

    }catch (err){
        return res.status(500).json({message:"Server Error",error: err.message});
    }
    //not Found
    if(!inventory || inventory.length === 0){
        return res.status(404).json({message:"Inventory not found"});
    }
    //Display all inventories
    return res.status(200).json({ inventory });
};

//data insert
const addInventory = async (req, res) => {
    const {productname,price,itemCount,date}= req.body;
    let inventory;

    try{
        inventory = new Inventory({
            productname,
            price,
            itemCount,
            date
        });
        await inventory.save();
    }catch(err) {
        return res.status(500).json({message:"unable to add inventory",error: err.message});
    }

        return res.status(201).json({message:"Inventory added successfully", inventory});
};

//get by id
const getByID = async (req, res)=>{
    const id = req.params.id;
    let inventory;

    try{
        inventory = await Inventory.findById(id);
        }catch(err) {
           return res.status(500).json({message:"Server Error",error: err.message});
                }

    //not available inventory
    if(!inventory){
        return res.status(404).json({message:"Inventory not found"});
        }
        return res.status(200).json({ inventory });
};

//update inventory details
const updateInventory = async (req,res) => {
    const id = req.params.id;
    const {productname, price, itemCount, date }= req.body;
    let inventory;

    try{
        inventory = await Inventory.findByIdAndUpdate(id,
            {productname,price, itemCount,date},
            {new: true}
        );
    }catch(err) {
       return res.status(500).json({message:"Unable to update inventory",error: err.message});
            }

    if(!inventory){
        return res.status(404).json({message:"Inventory not found"});
        }
        return res.status(200).json({ message:"Inventory updated successfully", inventory });
};
// delete inventory item
const deleteInventory = async (req,res) =>{
    const id = req.params.id;
    let inventory; 

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch(err){
       return res.status(500).json({message:"Unable to delete  inventory",error: err.message});
    }
    if(!inventory){
        return res.status(404).json({message:"Inventory not found for delete"});
        }
        return res.status(200).json({ message:"Inventory deleted successfully", inventory });
};


exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getByID = getByID;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;