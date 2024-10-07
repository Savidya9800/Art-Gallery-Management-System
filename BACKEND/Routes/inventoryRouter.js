const express = require("express");
const routerinv = express.Router();
const multer = require("multer");

// Insert inventory controller
const inventoryController = require("../Controllers/inventoryController");

// Multer setup for inventory image uploads
const inventoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './file'); // Folder for inventory images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix); // Save with a unique timestamp and original file name
  }
});

const uploadInventoryImg = multer({ storage: inventoryStorage });

// Define routes
routerinv.get("/", inventoryController.getAllInventory);

// POST route with image upload middleware
routerinv.post("/", uploadInventoryImg.single('image'), inventoryController.addInventory);

// GET inventory by ID
routerinv.get("/:id", inventoryController.getByID);

// PUT route with image upload middleware (for updating inventory)
routerinv.put("/:id", uploadInventoryImg.single('image'), inventoryController.updateInventory);

// DELETE inventory by ID
routerinv.delete("/:id", inventoryController.deleteInventory);

// Export
module.exports = routerinv;