const express = require('express');
const router = express.Router();
const ticketIssuesController = require('../Controllers/ticketIssuesController');
const Message = require('../Models/ticketIssuesModel')

router.post('/', async (req, res) => {
    const { visitorID, description } = req.body;
  
    try {
      // Create a new message object
      const newMessage = new Message({
        visitorID,
        description
      });
  
      // Save the message to the database
      const savedMessage = await newMessage.save();
      res.status(201).json({ message: savedMessage });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save message' });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const message = await Message.findByIdAndDelete(req.params.id);
  
      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete message' });
    }
  });

// Update a message by ID
router.put('/:id', async (req, res) => {
    const { visitorID, description } = req.body;
    
    try {
      // Find the message by ID and update it with the new data
      const updatedMessage = await Message.findByIdAndUpdate(
        req.params.id, 
        { visitorID, description }, 
        { new: true }
      );
  
      if (!updatedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      res.status(200).json({ message: updatedMessage });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update message' });
    }
  });

// Get all messages
router.get('/', async (req, res) => {
    try {
      const messages = await Message.find(); // Fetch all messages from the database
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      if (!message) return res.status(404).json({ error: 'Message not found' });
  
      // Update done status
      message.done = req.body.done;
      await message.save();
  
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update message' });
    }
  });

module.exports = router;