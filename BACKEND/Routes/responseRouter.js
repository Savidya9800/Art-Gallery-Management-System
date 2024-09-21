const express = require("express");
const router = express.Router();

//model inserting is here
const responseM = require('../Models/inquiryAdminModel');

//controller inserting is here
const AdminController = require('../Controllers/inquiryAdminController');

router.get("/",AdminController.getAllResponses); //Get All Responses

module.exports = router;
