const express = require('express');
const router = express.Router();
const artWork = require('../Models/artWorkModel'); //Insert Model
const artWorkController = require('../Controllers/artWorkController'); //Insert Controller

router.get("/",artWorkController.getAllArtWorks);
router.post("/",artWorkController.addArtWorks);
router.get("/:id",artWorkController.getById);
router.put("/:id",artWorkController.updateArtWork);
router.delete("/:id",artWorkController.deleteArtWork);

//Export 
module.exports = router;
