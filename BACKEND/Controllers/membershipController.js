const membershipModel = require("../Models/membershipModel");

exports.createMembership = async (req, res) => {
    try {
        const { userId, membershipType, membershipPrice, name, address, contactNumber } = req.body;

        // Check if the user already has a membership
        const existingMembership = await membershipModel.findOne({ userId });

        // Prevent creating a new membership if one already exists and the trial is still active
        if (existingMembership) {
            if (existingMembership.isTrialExpired) {
                return res.status(400).json({ message: "Free trial has expired. Please proceed with payment." });
            } else {
                return res.status(400).json({ message: "You already have an active membership." });
            }
        }

        const newMembership = new membershipModel({
            userId,
            membershipType,
            membershipPrice,
            name,
            address,
            contactNumber,
            freeTrialStartDate: Date.now(), // Start free trial from now
            isTrialExpired: false, // New membership, trial not expired
        });

        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Check if the free trial has expired
exports.checkTrialExpiration = async (req, res) => {
    const { userId } = req.params;

    try {
        const membership = await membershipModel.findOne({ userId });

        if (!membership) {
            return res.status(404).json({ message: "Membership not found" });
        }

        // Calculate the difference between the current date and the trial start date
        const trialDuration = 7; // 7 days trial
        const trialEndDate = new Date(membership.freeTrialStartDate);
        trialEndDate.setDate(trialEndDate.getDate() + trialDuration);

        const isTrialExpired = new Date() > trialEndDate; // True if the trial period has passed

        if (isTrialExpired) {
            // Mark the trial as expired
            membership.isTrialExpired = true;
            await membership.save();

            // Optionally, delete the membership or return the expiration status
            await membershipModel.deleteOne({ userId });
            return res.status(200).json({
                message: "Free trial has expired. Membership deleted.",
            });
        }

        // If the trial is not expired, return the remaining days
        res.status(200).json({
            isTrialExpired: membership.isTrialExpired,
            trialEndsIn: Math.max(0, Math.ceil((trialEndDate - new Date()) / (1000 * 60 * 60 * 24))), // Remaining days
        });
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

