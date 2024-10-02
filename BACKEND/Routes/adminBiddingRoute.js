const express = require("express");
const router = express.Router();

//insert model
const Adminbid = require('../Models/AdminBiddingModel');

//inser controller
const addBidController = require("../Controllers/AdminBiddingController");


router.get("/", addBidController.getAllAdminBidding);
router.post("/", addBidController.addBidArt);
router.get("/:bidId", addBidController.getBidArtById);
router.put("/:bidId", addBidController.updateBidArt);
router.delete("/:bidId", addBidController.deleteBidArt);

//export
module.exports = router;