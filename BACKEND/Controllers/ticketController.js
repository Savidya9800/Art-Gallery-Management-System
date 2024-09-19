const Visitor = require("../Models/ticketModel");

// Get all visitors
const getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        if (!visitors || visitors.length === 0) {
            return res.status(404).json({ message: "Could not find any visitors" });
        }
        return res.status(200).json({ visitors });
    } catch (err) {
        console.error('Error retrieving visitors:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Add a new visitor
const addVisitors = async (req, res) => {
    const { date, time, tickets, fname, lname, email, phone, city, country } = req.body;

    try {
        const visitor = new Visitor({ date, time, tickets, fname, lname, email, phone, city, country });
        await visitor.save();
        return res.status(201).json({ visitor });
    } catch (err) {
        console.error('Error saving visitor:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get visitor by ID
const getByID = async (req, res) => {
    const id = req.params.id;

    try {
        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        return res.status(200).json({ visitor });
    } catch (err) {
        console.error('Error retrieving visitor:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update visitor
const updateVisitor = async (req, res) => {
    const id = req.params.id;
    const { date, time, tickets, fname, lname, email, phone, city, country } = req.body;

    try {
        const visitor = await Visitor.findByIdAndUpdate(id, 
            { date, time, tickets, fname, lname, email, phone, city, country }, 
            { new: true }
        );
        if (!visitor) {
            return res.status(404).json({ message: "Could not update visitor" });
        }
        return res.status(200).json({ visitor });
    } catch (err) {
        console.error('Error updating visitor:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete visitor
const deleteVisitor = async (req, res) => {
    const id = req.params.id;

    try {
        const visitor = await Visitor.findByIdAndDelete(id);
        if (!visitor) {
            return res.status(404).json({ message: "Could not find visitor" });
        }
        return res.status(200).json({ message: "Visitor deleted successfully" });
    } catch (err) {
        console.error('Error deleting visitor:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllVisitors = getAllVisitors;
exports.addVisitors = addVisitors;
exports.getByID = getByID;
exports.updateVisitor = updateVisitor;
exports.deleteVisitor = deleteVisitor;