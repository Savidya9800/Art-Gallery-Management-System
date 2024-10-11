const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    membershipType: {
        type: String,
        required: true,
    },
    membershipPrice: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    freeTrialStartDate: {
        type: Date,
        default: null, // Will be null initially, set when the free trial starts
    },
    isTrialExpired: {
        type: Boolean,
        default: false, // Tracks if the trial has expired
    },
});

const membershipModel = mongoose.model("Membership", membershipSchema);

module.exports = membershipModel;
