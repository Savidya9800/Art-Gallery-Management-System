const express = require("express");
const routerinv = express.Router();
const{check, validationResult} = require("express-validator");
//insert model
const Inventory = require("../Models/inventoryModel");
//insert inventory controler
const inventoryController = require("../Controllers/inventoryController");

routerinv.get("/",inventoryController.getAllInventory);
routerinv.post("/",inventoryController.addInventory);
routerinv.get("/:id",inventoryController.getByID);
routerinv.put("/:id",inventoryController.updateInventory);
routerinv.delete("/:id",inventoryController.deleteInventory);

//export
module.exports = routerinv;