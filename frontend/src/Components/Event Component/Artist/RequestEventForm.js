import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationBar from "../../Nav Component/NavigationBar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RighSideImage from "../Artist/background.jpg";
import FooterComp from "../../Nav Component/FooterComp";
import Button from "react-bootstrap/Button";

import "./date_change.css";

const RequestEventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, name } = location.state || { email: "", name: "" };
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: "package1",
      name: "Package 1",
      memberCountRange: { min: 200, max: 500 },
      budget: 10000,
      Decoration: "Without Decoration",
      Venue: "Community Center",
    },
    {
      id: "package2",
      name: "Package 2",
      memberCountRange: { min: 200, max: 500 },
      budget: 15000,
      Decoration: "With Decoration",
      Venue: "Community Center",
    },
    {
      id: "package3",
      name: "Package 3",
      memberCountRange: { min: 501, max: 1000 },
      budget: 20000,
      Decoration: "Without Decoration",
      Venue: "Conference Hall",
    },
    {
      id: "package4",
      name: "Package 4",
      memberCountRange: { min: 501, max: 1000 },
      budget: 25000,
      Decoration: "With Decoration",
      Venue: "Conference Hall",
    },
    {
      id: "package5",
      name: "Package 5",
      memberCountRange: { min: 1001, max: 2000 },
      budget: 30000,
      Decoration: "Without Decoration",
      Venue: "Local Park",
    },
    {
      id: "package6",
      name: "Package 6",
      memberCountRange: { min: 1001, max: 2000 },
      budget: 35000,
      Decoration: "With Decoration",
      Venue: "Local Park",
    },
    {
      id: "package7",
      name: "Package 7",
      memberCountRange: { min: 1, max: 199 },
      budget: 7000,
      Decoration: "Without Decoration",
      Venue: "Local Park",
    },
    {
      id: "package8",
      name: "Package 8",
      memberCountRange: { min: 1, max: 199 },
      budget: 9000,
      Decoration: "With Decoration",
      Venue: "Local Park",
    },
  ];

  const initialFormData = {
    name: "",
    artist: "",
    email: email || "",
    mobileNumber: "",
    memberCount: "",
    message: "",
    eventDate: null,
    status: "pending",
    budget: "",
    packageName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRequests, setUserRequests] = useState({
    pending: [],
    accepted: [],
    rejected: [],
  });

  const [editingRequestId, setEditingRequestId] = useState(null);
  const [editedRequestData, setEditedRequestData] = useState({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      resetForm();
    }
  };

  const handleMemberCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setFormData({ ...formData, memberCount: count });

    const matchedPackage = packages.find(
      (pkg) =>
        count >= pkg.memberCountRange.min && count <= pkg.memberCountRange.max
    );

    if (matchedPackage) {
      setSelectedPackage(matchedPackage);
      setFormData((prevFormData) => ({
        ...prevFormData,
        budget: matchedPackage.budget,
        packageName: matchedPackage.name,
        Decoration: matchedPackage.Decoration,
        Venue: matchedPackage.Venue,
      }));
    } else {
      setSelectedPackage(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        budget: "",
        packageName: "",
        Decoration: "",
        Venue: "",
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      eventDate: date,
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChoosePackage = (requestId) => {
    const selectedRequest = userRequests.accepted.find(
      (req) => req._id === requestId
    );

    if (selectedRequest) {
      const matchedPackage = packages.find(
        (pkg) => pkg.name === selectedRequest.packageName
      );

      if (matchedPackage) {
        setSelectedPackage(matchedPackage);
        setFormData({
          ...formData,
          budget: matchedPackage.budget,
          packageName: matchedPackage.name,
          Decoration: matchedPackage.Decoration,
          Venue: matchedPackage.Venue,
        });

        // Navigate to the payment page and pass the necessary details
        navigate("/paymentgateway", {
          state: {
            selectedPackage: matchedPackage,
            email: selectedRequest.email, // assuming email is part of selectedRequest
            eventDate: selectedRequest.eventDate, // assuming eventDate is part of selectedRequest
            artistName: selectedRequest.name, // assuming name is the artist's name
          },
        });
      } else {
        console.error("No matching package found");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post(
        "http://localhost:5000/requestEvent/submitrequest",
        formData
      );
      alert("Form submitted successfully!");
      resetForm();
      toggleModal();
      fetchUserRequests();
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }

    e.preventDefault(); // Prevent form default submission

    if (!formData.eventDate) {
      alert("Please select a date and time for the event.");
      return; // Stop the form submission if the date is not selected
    }

    // Proceed with form submission logic if validation passes
    console.log("Form submitted with data:", formData);
    // Add your submission logic here (e.g., sending form data to a server)
  };

  const fetchUserRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/requestEvent/getrequestsbyemail/${email}`
      );
      const requests = response.data;

      const pendingRequests = requests.filter(
        (request) => request.status === "pending"
      );
      const acceptedRequests = requests.filter(
        (request) => request.status === "Accepted"
      );
      const rejectedRequests = requests.filter(
        (request) => request.status === "Rejected"
      );

      setUserRequests({
        pending: pendingRequests,
        accepted: acceptedRequests,
        rejected: rejectedRequests,
      });
    } catch (error) {
      console.error("Error fetching user requests:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUserRequests();
    }
  }, [email]);

  const goToEventManagerRequest = () => {
    navigate("/event-manager-request");
  };

  const deleteRequest = async (requestId) => {
    try {
      await axios.delete(
        `http://localhost:5000/requestEvent/deleterequest/${requestId}`
      );
      alert("Request deleted successfully!");
      fetchUserRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleEditClick = (request) => {
    setEditingRequestId(request._id);
    setEditedRequestData(request);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:5000/requestEvent/updaterequest/${editingRequestId}`,
        editedRequestData
      );
      alert("Request updated successfully!");
      setEditingRequestId(null);
      fetchUserRequests();
    } catch (error) {
      console.error("Error updating request:", error);
      const phoneNumber = editedRequestData.mobileNumber;
      const message = editedRequestData.message;

      // Phone number validation
      if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      // Message validation
      if (message.trim() === "") {
        alert("Message field cannot be empty.");
        return;
      }

      // Proceed with saving data only if both validations pass
      console.log("Data is valid, saving the request...", editedRequestData);

      // Assuming you have your save logic here, after validations succeed
      setEditingRequestId(null);
    }
  };

  const handleEditedChange = (e) => {
    setEditedRequestData({
      ...editedRequestData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePackageSelection = (pkg) => {
    setFormData({
      ...formData,
      budget: pkg.budget,
      package: pkg.name,
      packageName: pkg.name,
      Decoration: pkg.Decoration,
      Venue: pkg.Venue,
    });
    setSelectedPackage(pkg);
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      formData.memberCount &&
      formData.memberCount >= pkg.memberCountRange.min &&
      formData.memberCount <= pkg.memberCountRange.max
  );

  return (
    <div>
      <NavigationBar />

      <div className="request-event-form">
        <div className="p-4 form-container">
          <button
            className="bg-[#A78F51] text-white px-4 py-2 rounded "
            onClick={toggleModal}
          >
            Request Event
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal">
              <div className="modal-content bg-white p-10 rounded-lg shadow-lg w-full h-auto max-h-[90vh] overflow-auto">
                <span
                  className="text-red-500 cursor-pointer close"
                  onClick={toggleModal}
                >
                  &times;
                </span>

                <h1 className="mb-4 text-4xl font-bold text-center bg-white heading">
                  Plan Your Event
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-center mb-4 bg-white date-picker-container">
                    <div className="w-full max-w-lg">
                      <label className="block mb-2 font-semibold text-center">
                        Event Date and Time:
                      </label>
                      <div className="w-full">
                        <DatePicker
                          selected={formData.eventDate}
                          onChange={handleDateChange}
                          showTimeSelect
                          dateFormat="Pp"
                          inline
                          className="w-full" // Full width for DatePicker
                          minDate={new Date()} // Disable past dates
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white form-fields">
                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Event Name:{" "}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>
                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Artist Name:{" "}
                      </label>
                      <input
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Email:{" "}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Mobile Number:
                      </label>
                      <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, ""); // This replaces any non-digit character
                        }}
                        onChange={handleChange}
                        required
                        maxLength={10}
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Member Count:
                      </label>
                      <input
                        type="number"
                        name="memberCount"
                        value={formData.memberCount}
                        onChange={handleMemberCountChange}
                        min="0" // This ensures no negative values are entered
                        onKeyPress={(e) => {
                          if (e.key === "-" || e.key === "+" || e.key === "e") {
                            e.preventDefault(); // Prevents typing minus, plus, and scientific notation
                          }
                        }}
                        required
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Budget:{" "}
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        disabled={!!formData.package}
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Selected Package:{" "}
                      </label>
                      <input
                        type="text"
                        name="packageName"
                        value={formData.packageName}
                        onChange={handleChange}
                        required
                        readOnly
                        className="w-full p-2 bg-white bg-gray-200 border border-gray-300 rounded"
                      />
                    </div>

                    <div className="mb-4 bg-white">
                      <label className="block font-semibold bg-white">
                        Message:{" "}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-white border border-gray-300 rounded"
                      />
                    </div>

                    <input
                      type="hidden"
                      name="status"
                      value={formData.status}
                    />

                    <Button type="submit" variant="dark">
                      Submit
                    </Button>
                  </div>
                </form>

                {filteredPackages.length > 0 && (
                  <div className="mt-6 package-selection">
                    <h3 className="text-lg font-semibold text-center">
                      Available Packages:
                    </h3>
                    <ul className="mt-2">
                      {filteredPackages.map((pkg) => (
                        <li key={pkg.id} className="mb-4">
                          <div className="p-4 border border-gray-300 rounded package-card">
                            <strong>{pkg.name}</strong>
                            <p>
                              Member Count: {pkg.memberCountRange.min} -{" "}
                              {pkg.memberCountRange.max}
                            </p>
                            <p>Package Include: {pkg.Decoration}</p>
                            <p>Venue: {pkg.Venue}</p>
                            <p>Budget: {pkg.budget}</p>

                            <button
                              className="bg-[#A78F51] text-white mt-2 px-3 py-1 rounded "
                              onClick={() => handlePackageSelection(pkg)}
                            >
                              {formData.package === pkg.name
                                ? "Selected"
                                : "Choose Package"}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <br />
                    <p>
                      <b class>If the Package you need is not here,</b>
                    </p>
                    <p>
                      Call - 011 2 232 456 <br />
                      Email - eventadmin@gmail.com
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="p-6 rounded-lg shadow-md user-requests">
            <h2 className="mb-4 text-3xl font-bold text-center text-gray-800 topic">
              EVENT REQUESTS
            </h2>

            <h3 className="mb-2 text-xl font-semibold text-yellow-600 pending_topic">
              Pending Requests
            </h3>

            <div
              className="w-full p-4 overflow-auto rounded-lg shadow-inner user-requests-section h-104"
              style={{ height: "400px" }}
            >
              {userRequests.pending.length > 0 ? (
                <ul>
                  {userRequests.pending.map((request) => (
                    <li key={request._id} className="mb-4">
                      <div
                        className="p-4 border-l-4 border-yellow-600 rounded-lg request-card rejected"
                        style={{ width: "1400px" }}
                      >
                        {editingRequestId === request._id ? (
                          <div className="space-y-4 bg-red-50 ">
                            <div>
                              <label className="block font-semibold text-gray-700 bg-red-50">
                                Mobile Number:
                              </label>
                              <input
                                type="text"
                                name="mobileNumber"
                                value={editedRequestData.mobileNumber}
                                onChange={(e) => {
                                  const phoneNumber = e.target.value;

                                  // Only allow numbers and ensure length is no more than 10 digits
                                  if (/^\d{0,10}$/.test(phoneNumber)) {
                                    handleEditedChange(e);
                                  }
                                }}
                                className="w-full p-2 border rounded border-gray-50 bg-red-50"
                              />
                              {/* Show validation error message if needed */}
                              {editedRequestData.mobileNumber &&
                                editedRequestData.mobileNumber.length < 10 && (
                                  <p className="mt-2 text-red-600">
                                    Mobile number must be exactly 10 digits.
                                  </p>
                                )}
                            </div>

                            <div>
                              <label className="block font-semibold text-gray-700 bg-red-50">
                                Message:
                              </label>
                              <textarea
                                name="message"
                                value={editedRequestData.message}
                                onChange={(e) => {
                                  handleEditedChange(e);
                                }}
                                className="w-full p-2 border rounded border-gray-50 bg-red-50"
                              />
                              {/* Show validation error message if message is empty */}
                              {editedRequestData.message === "" && (
                                <p className="mt-2 text-red-600">
                                  Message field cannot be empty.
                                </p>
                              )}
                            </div>

                            <div className="flex space-x-4 bg-red-50">
                              <Button
                                onClick={handleSaveClick}
                                variant="primary"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingRequestId(null)}
                                variant="danger"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full space-y-2 ">
                            <strong className="block text-lg text-gray-800">
                              {request.name}
                            </strong>
                            <p className="text-gray-600">
                              <strong>Status:</strong>{" "}
                              <span className="text-yellow-600">
                                {request.status}
                              </span>
                            </p>
                            <p className="text-gray-600">
                              <strong>Artist:</strong> {request.artist}
                            </p>
                            <p className="text-gray-600">
                              <strong>Budget:</strong> {request.budget}
                            </p>
                            <p className="text-gray-600">
                              <strong>Member Count:</strong>{" "}
                              {request.memberCount}
                            </p>
                            <p className="text-gray-600">
                              <strong>Mobile Number:</strong>{" "}
                              {request.mobileNumber}
                            </p>
                            <p className="text-gray-600">
                              <strong>Package:</strong> {request.packageName}
                            </p>
                            <p className="text-gray-600">
                              <strong>Message:</strong> {request.message}
                            </p>
                            <p className="text-gray-600">
                              <strong>Date:</strong>{" "}
                              {request.eventDate
                                ? new Date(request.eventDate).toLocaleString()
                                : "No Date"}
                            </p>
                            <div className="flex space-x-4">
                              <Button
                                variant="primary"
                                onClick={() => handleEditClick(request)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => deleteRequest(request._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 pending_result">
                  No pending requests found.
                </p>
              )}
            </div>

            <h3 className="mb-2 text-xl font-semibold text-green-600 accept_topic">
              Accepted Requests
            </h3>
            <div
              className="w-full p-4 overflow-auto rounded-lg shadow-inner user-requests-section h-104"
              style={{ height: "400px" }}
            >
              {userRequests.accepted.length > 0 ? (
                <ul>
                  {userRequests.accepted.map((request) => (
                    <li key={request._id} className="mb-4">
                      <div
                        className="p-4 border-l-4 border-green-600 rounded-lg request-card rejected"
                        style={{ width: "1400px" }}
                      >
                        <strong className="block text-lg text-gray-800">
                          {request.name}
                        </strong>
                        <p className="text-gray-600">
                          <strong>Status:</strong>{" "}
                          <span className="text-green-600">
                            {request.status}
                          </span>
                        </p>
                        <p className="text-gray-600">
                          <strong>Budget:</strong> {request.budget}
                        </p>
                        <p className="text-gray-600">
                          <strong>Member Count:</strong> {request.memberCount}
                        </p>
                        <p className="text-gray-600">
                          <strong>Mobile Number:</strong> {request.mobileNumber}
                        </p>
                        <p className="text-gray-600">
                          <strong>Package:</strong> {request.packageName}
                        </p>
                        <p className="text-gray-600">
                          <strong>Message:</strong> {request.message}
                        </p>
                        <p className="text-gray-600">
                          <strong>Date:</strong>{" "}
                          {request.eventDate
                            ? new Date(request.eventDate).toLocaleString()
                            : "No Date"}
                        </p>
                        <div className="flex space-x-4">
                          <Button
                            variant="info"
                            onClick={() => handleChoosePackage(request._id)}
                          >
                            Generate PDF
                          </Button>
                          <Button
                            variant="dark"
                            onClick={() => handleChoosePackage(request._id)}
                          >
                            Pay Now
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No accepted requests found.</p>
              )}
            </div>

            <h3 className="mb-2 text-xl font-semibold text-red-600 reject_topic">
              Rejected Requests
            </h3>
            <div
              className="w-full p-4 overflow-auto rounded-lg shadow-inner user-requests-section h-104"
              style={{ height: "400px" }}
            >
              {userRequests.rejected.length > 0 ? (
                <ul>
                  {userRequests.rejected.map((request) => (
                    <li key={request._id} className="mb-4">
                      <div
                        className="p-4 border-l-4 border-red-500 rounded-lg request-card rejected"
                        style={{ width: "1400px" }}
                      >
                        <strong className="block text-lg text-gray-800">
                          {request.name}
                        </strong>
                        <p className="text-gray-600">
                          <strong>Status:</strong>{" "}
                          <span className="text-red-600">{request.status}</span>
                        </p>
                        <p className="text-gray-600">
                          <strong>Budget:</strong> {request.budget}
                        </p>
                        <p className="text-gray-600">
                          <strong>Member Count:</strong> {request.memberCount}
                        </p>
                        <p className="text-gray-600">
                          <strong>Mobile Number:</strong> {request.mobileNumber}
                        </p>
                        <p className="text-gray-600">
                          <strong>Package:</strong> {request.packageName}
                        </p>
                        <p className="text-gray-600">
                          <strong>Message:</strong> {request.message}
                        </p>
                        <p className="text-gray-600">
                          <strong>Date:</strong>{" "}
                          {request.eventDate
                            ? new Date(request.eventDate).toLocaleString()
                            : "No Date"}
                        </p>
                        <Button
                          variant="danger"
                          onClick={() => deleteRequest(request._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No rejected requests found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default RequestEventForm;
