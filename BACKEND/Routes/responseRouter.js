const express = require("express");
const router = express.Router();

//model inserting is here
const responseM = require('../Models/inquiryAdminModel');

//controller inserting is here
const AdminController = require('../Controllers/inquiryAdminController');

router.get("/",AdminController.getAllResponses); //Get All Responses
router.post("/",AdminController.addResponse); //Get All Responses
router.get("/:id",AdminController.getResponseById); //Get All Responses
router.put("/:id",AdminController.updateResponse); //update Responses
router.delete("/:id",AdminController.deleteResponse); //delete Responses



module.exports = router;
