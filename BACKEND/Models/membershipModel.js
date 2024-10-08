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
});

const membershipModel = mongoose.model("Membership", membershipSchema);

module.exports = membershipModel;
