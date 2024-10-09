const express = require("express");
const routerinv = express.Router();
const multer = require("multer");

// Insert inventory controller
const inventoryController = require("../Controllers/inventoryController");



const path = require('path');
const inventoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../file')); // Ensure the path is correctly set
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});


const uploadInventoryImg = multer({ storage: inventoryStorage });

// Define routes
routerinv.get("/", inventoryController.getAllInventory);


routerinv.post("/", uploadInventoryImg.single('image'), (req, res) => {
  console.log(req.file); // Log the uploaded file details
  console.log(req.body); // Log other form data
  inventoryController.addInventory(req, res);
});


// GET inventory by ID
routerinv.get("/:id", inventoryController.getByID);

// PUT route with image upload middleware (for updating inventory)
routerinv.put("/:id", uploadInventoryImg.single('image'), inventoryController.updateInventory);

// DELETE inventory by ID
routerinv.delete("/:id", inventoryController.deleteInventory);

// Export
module.exports=routerinv;