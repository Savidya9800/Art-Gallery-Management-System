const express = require("express");
const router = express.Router();
const { createMembership, getAllMemberships, deleteMembership, updateMembership, getMembershipById, getMembershipByUserId } = require("../Controllers/membershipController");

router.post("/", createMembership);
router.get("/", getAllMemberships);
router.delete("/:id", deleteMembership);
router.put("/:id", updateMembership);
router.get("/:id", getMembershipById);
router.get("/user/:userId", getMembershipByUserId);

module.exports = router;
