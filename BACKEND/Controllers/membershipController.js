const membershipModel = require("../Models/membershipModel");

exports.createMembership = async (req, res) => {
    try {
        const { userId, membershipType, membershipPrice, name, address, contactNumber } =
            req.body;
        const newMembership = new membershipModel({
            userId,
            membershipType,
            membershipPrice,
            name,
            address,
            contactNumber,
        });
        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllMemberships = async (req, res) => {
    try {
        const memberships = await membershipModel.find();
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMembership = async (req, res) => {
    try {
        const { id } = req.params;
        await membershipModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Membership deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateMembership = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, membershipType, membershipPrice, name, address, contactNumber } = req.body;
        const updatedMembership = await membershipModel.findByIdAndUpdate(id, { userId, membershipType, membershipPrice, name, address, contactNumber }, { new: true });
        res.status(200).json(updatedMembership);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMembershipById = async (req, res) => {
    try {
        const { id } = req.params;
        const membership = await membershipModel.findById(id);
        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMembershipByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const membership = await membershipModel.findOne({ userId });
        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
