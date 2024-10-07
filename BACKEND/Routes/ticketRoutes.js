const express = require("express");
const router = express.Router()
const ticketController = require("../Controllers/ticketController");

//Insert Model
const Visitor = require("../Models/ticketModel");
//Insert Controller
const VisitorController = require("../Controllers/ticketController");

router.get("/", ticketController.getAllVisitors);
router.post("/", ticketController.addVisitors);
router.get("/:id", ticketController.getByID);
router.put("/:id", ticketController.updateVisitor);
router.delete("/:id", VisitorController.deleteVisitor);


//export
module.exports = router;