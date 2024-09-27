const express = require("express");
const router = express.Router();

//insert model
const biddingM = require('../Models/BiddingModel');
//insert user contoller
const biddingC = require('../Controllers/BiddingController');


router.get("/",biddingC.getAllBidders); //Get All Bidders
router.post("/",biddingC.addBid); //Insert new Bids
router.get("/:id",biddingC.getById); //Get Bidders by ID
router.put("/:id",biddingC.updateBid); //Update Bids by ID
router.delete("/:id",biddingC.deleteBid);//delete Bids by ID

module.exports = router;