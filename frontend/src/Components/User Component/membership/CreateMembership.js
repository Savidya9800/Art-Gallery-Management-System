import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMembership = () => {
    const [membershipType, setMembershipType] = useState("");
    const [membershipPrice, setMembershipPrice] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");
    const [nameError, setNameError] = useState(""); // State for name error
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (membershipType === "Monthly") {
            setMembershipPrice(12);
        } else if (membershipType === "Annual") {
            setMembershipPrice(130);
        } else {
            setMembershipPrice("");
        }
    }, [membershipType]);

    const validatePhoneNumber = (number) => {
        // Validate if the phone number is exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate contact number
        if (!validatePhoneNumber(contactNumber)) {
            setContactNumberError("Should be a valid 10 digit phone number");
            return; // Prevent form submission if invalid
        }

        setContactNumberError(""); // Clear error if valid

        // Validate name doesn't start with a number
        if (/^\d/.test(name)) {
            setNameError("Name cannot start with a number");
            return; // Prevent form submission if invalid
        }

        setNameError(""); // Clear error if valid

        try {
            const response = await axios.post(
                "http://localhost:5000/api/membership",
                {
                    userId: user._id,
                    membershipType,
                    membershipPrice,
                    name,
                    address,
                    contactNumber,
                }
            );
            console.log(response.data);
            navigate("/profile");
            alert("Membership created successfully");
        } catch (error) {
            console.error("Error creating membership:", error);
            alert("Error creating membership");
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^\d/.test(value)) {
            setNameError("Name cannot start with a number");
        } else {
            setNameError(""); // Clear error if valid
        }
        setName(value);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Create Membership</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 pl-1">Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={handleNameChange} // Use the new handler for name validation
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {nameError && (
                        <p className="text-red-600 text-sm mt-1">{nameError}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 pl-1">Address</label>
                    <input
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 pl-1">Contact Number</label>
                    <input
                        type="tel"
                        placeholder="Enter contact number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {contactNumberError && (
                        <p className="text-red-600 text-sm mt-1">{contactNumberError}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 pl-1">Membership Type</label>
                    <select
                        value={membershipType}
                        onChange={(e) => setMembershipType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Membership Type</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Annual">Annual</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 pl-1">Membership Price</label>
                    <div className="flex items-center border border-gray-300 rounded-md bg-gray-100">
                        <span className="p-2 text-gray-600">$</span>
                        <input
                            type="number"
                            value={membershipPrice}
                            readOnly
                            className="w-full p-2 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-900"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Create Membership 
                    (Start Free Trial)
                </button>
                <button
                    type="button"
                    onClick={() => alert('Proceeding to payment...')} // You can replace this with actual payment functionality
                    className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 mt-4"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default CreateMembership;

