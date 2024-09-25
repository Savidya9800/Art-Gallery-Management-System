const RequestEvent = require('../../Models/EventModels/RequestEvent_model');

// Submit a new request
const submitRequest = async (req, res) => {
  try {
    const { name, email, mobileNumber, memberCount, message, eventDate, status, budget, packageName } = req.body;

    // Create a new RequestEvent document
    const newRequest = new RequestEvent({
      name,
      email,
      mobileNumber,
      memberCount,
      message,
      eventDate,
      status,
      budget,
      packageName
    });

    // Save the new document to the database
    await newRequest.save();
    res.status(200).json({ message: 'Request submitted successfully!' });
  } catch (error) {
    console.error('Error saving the request:', error);
    res.status(500).json({ error: 'Error submitting the request' });
  }
};

// Get all requests, deleting past events first
const getAllRequests = async (req, res) => {
  try {
    const currentDate = new Date();
    await RequestEvent.deleteMany({ eventDate: { $lt: currentDate } });
    const requests = await RequestEvent.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Error fetching requests' });
  }
};

// Update the status of a request by ID
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedRequest = await RequestEvent.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({ error: 'Error updating request status' });
  }
};

// Get all accepted requests
const getAcceptedRequests = async (req, res) => {
  try {
    const requests = await RequestEvent.find({ status: 'Accepted' });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching accepted requests:', error);
    res.status(500).json({ error: 'Error fetching accepted requests' });
  }
};

// Get requests by email
const getRequestsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const requests = await RequestEvent.find({ email });
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests by email:', error);
    res.status(500).json({ error: 'Error fetching requests by email' });
  }
};

// Delete a request by ID
const deleteRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    await RequestEvent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Request deleted successfully!' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: 'Error deleting request' });
  }
};

// Update specific fields of a request by ID
const updateRequestFields = async (req, res) => {
  try {
    const { id } = req.params;
    const { mobileNumber, message } = req.body;

    const updatedRequest = await RequestEvent.findByIdAndUpdate(id, { mobileNumber, message }, { new: true });
    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ error: 'Error updating request' });
  }
};

module.exports = {
  submitRequest,
  getAllRequests,
  updateRequestStatus,
  getAcceptedRequests,
  getRequestsByEmail,
  deleteRequestById,
  updateRequestFields
};
