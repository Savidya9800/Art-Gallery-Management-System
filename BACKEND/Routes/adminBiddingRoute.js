const express = require("express");
const router = express.Router();
const multer = require("multer");

//insert model
const Adminbid = require('../Models/AdminBiddingModel');

//inser controller
const addBidController = require("../Controllers/AdminBiddingController");

const path = require('path');
const adminbidding = multer.diskStorage({ //multer storage for image
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../file')); // Ensure the path is correctly set
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const uploadbiddingImg = multer({ storage: adminbidding }); //multer storage for image


router.get("/", addBidController.getAllAdminBidding);
//router.post("/", addBidController.addBidArt);
router.get("/:bidId", addBidController.getBidArtById);
//router.put("/:bidId", addBidController.updateBidArt);
router.delete("/:bidId", addBidController.deleteBidArt);

router.post("/", uploadbiddingImg.single('image'), (req,res) => {
    console.log(req.file); // Log the uploaded file details
    console.log(req.body); // Log other form data
    addBidController.addBidArt(req, res);
});
router.put("/:bidId", uploadbiddingImg.single('image'), addBidController.updateBidArt);

//export
module.exports = router;