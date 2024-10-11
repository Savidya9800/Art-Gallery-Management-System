const express = require("express");
const router = express.Router();
const { createMembership, getAllMemberships, deleteMembership, updateMembership, getMembershipById, getMembershipByUserId } = require("../Controllers/membershipController");

router.post("/", createMembership); // Create membership with free trial (7 days timer)
router.get("/", getAllMemberships); // Get all memberships
router.delete("/:id", deleteMembership); // Delete membership
router.put("/:id", updateMembership); // Update membership
router.get("/:id", getMembershipById); // Get membership by ID
router.get("/user/:userId", getMembershipByUserId); // Get membership by user ID with trial check
//router.get("/:userId/checkTrialExpiration", checkTrialExpiration);  // Route to check if trial is expired



module.exports = router;
