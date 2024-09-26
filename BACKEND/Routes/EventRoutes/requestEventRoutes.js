const express = require('express');
const {
  submitRequest,
  getAllRequests,
  updateRequestStatus,
  getAcceptedRequests,
  getRequestsByEmail,
  deleteRequestById,
  updateRequestFields
} = require('../../Controllers/EventController/RequestEvent_Controller');

const router = express.Router();

// Route for submitting a new request
router.post('/submitrequest', submitRequest);

// Route for getting all requests
router.get('/getrequests', getAllRequests);

// Route for updating the status of a request
router.put('/updatestatus/:id', updateRequestStatus);

// Route for getting all accepted requests
router.get('/getacceptedrequests', getAcceptedRequests);

// Route for getting requests by email
router.get('/getrequestsbyemail/:email', getRequestsByEmail);

// Route for deleting a request by ID
router.delete('/deleterequest/:id', deleteRequestById);

// Route for updating specific fields of a request
router.put('/updaterequest/:id', updateRequestFields);

module.exports = router;
