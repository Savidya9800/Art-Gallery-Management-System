const Inventory = require("../Models/inventoryModel");

// Get all inventory
const getAllInventory = async (req, res) => {
    let inventory;

    try {
        inventory = await Inventory.find();
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }

    if (!inventory || inventory.length === 0) {
        return res.status(404).json({ message: "Inventory not found" });
    }

    return res.status(200).json({ inventory });
};

// Add new inventory with image upload
const addInventory = async (req, res) => {
    const { productname, price, itemCount, date } = req.body;

    let inventory;
    let imageName = req.file ? req.file.filename : null; // Check if image is uploaded

    try {
        inventory = new Inventory({
            productname,
            price,
            itemCount,
            date,
            image: imageName // Store image filename in the inventory document
        });
        await inventory.save();
    } catch (err) {
        return res.status(500).json({ message: "Unable to add inventory", error: err.message });
    }

    return res.status(201).json({ message: "Inventory added successfully", inventory });
};

// Get inventory by ID
const getByID = async (req, res) => {
    const id = req.params.id;
    let inventory;

    try {
        inventory = await Inventory.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Server Error", error: err.message });
    }

    if (!inventory) {
        return res.status(404).json({ message: "Inventory not found" });
    }

    return res.status(200).json({ inventory });
};

// Update inventory details including image
const updateInventory = async (req, res) => {
    const id = req.params.id;
    const { productname, price, itemCount, date } = req.body;
    
    let imageName = req.file ? req.file.filename : null; // Check if a new image is uploaded
    let inventory;

    try {
        inventory = await Inventory.findById(id);

        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }

        // Update the fields, and only change the image if a new one is uploaded
        inventory.productname = productname || inventory.productname;
        inventory.price = price || inventory.price;
        inventory.itemCount = itemCount || inventory.itemCount;
        inventory.date = date || inventory.date;

        if (imageName) {
            inventory.image = imageName; // Update the image if a new one is uploaded
        }

        await inventory.save();

    } catch (err) {
        return res.status(500).json({ message: "Unable to update inventory", error: err.message });
    }

    return res.status(200).json({ message: "Inventory updated successfully", inventory });
};

// Delete inventory item
const deleteInventory = async (req, res) => {
    const id = req.params.id;
    let inventory;

    try {
        inventory = await Inventory.findByIdAndDelete(id);
    } catch (err) {
        return res.status(500).json({ message: "Unable to delete inventory", error: err.message });
    }

    if (!inventory) {
        return res.status(404).json({ message: "Inventory not found for delete" });
    }

    return res.status(200).json({ message: "Inventory deleted successfully", inventory });
};

exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getByID = getByID;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;