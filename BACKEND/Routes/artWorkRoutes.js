const express = require('express');
const router = express.Router();
const artWork = require('../Models/artWorkModel'); //Insert Model
const artWorkController = require('../Controllers/artWorkController'); //Insert Controller

router.get("/",artWorkController.getAllArtWorks); //Get All ArtWorks
router.post("/",artWorkController.addArtWorks); //Add ArtWorks
router.get("/:id",artWorkController.getById); //Get ArtWorks by ID
router.put("/:id",artWorkController.updateArtWork); //Update ArtWorks
router.delete("/:id",artWorkController.deleteArtWork); //Delete ArtWorks

//Export 
module.exports = router;
