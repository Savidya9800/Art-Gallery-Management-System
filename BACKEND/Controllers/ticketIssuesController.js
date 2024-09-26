const Message = require('../Models/ticketIssuesModel');

const addMessage = async (req, res) => {
    const { visitorID, description } = req.body;

    try {
        const { visitorID, description } = req.body;
        const newMessage = new Message({
            visitorID,
            description
        });
        const savedMessage = await newMessage.save(); // Store the message in MongoDB
        res.status(201).json({ message: savedMessage });
    } catch (err) {
        console.error('Error saving message:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.addMessage = addMessage;