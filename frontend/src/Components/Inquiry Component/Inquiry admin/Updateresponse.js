import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateResponse() {
    const [inputs, setInputs] = useState({
        response: '',
        inquirystatus: '',
    });
    const [loading, setLoading] = useState(true); // Loading state
    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/adminResponse/${id}`);
                const data = res.data;

                // Set the inputs state to include response and inquirystatus
                setInputs({
                    response: data.response || '',
                    inquirystatus: data.inquirystatus || ''
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Update loading state
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/adminResponse/${id}`, {
            response: String(inputs.response),
            inquirystatus: String(inputs.inquirystatus),
        }).then((res) => res.data);
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/Viewresponse"));
    };

    // If data is still loading, show a loading message
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Update Response</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Response</label>
                    <input
                        type="text"
                        name="response"
                        onChange={handleChange}
                        value={inputs.response}  // Ensure the value is bound correctly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        placeholder="Enter your response here"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Status</label>
                    <select
                        name="inquirystatus"
                        onChange={handleChange}
                        value={inputs.inquirystatus}  // Ensure the value is bound correctly
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                    >
                        <option value="">Select</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Pending">Pending</option>
                        <option value="Not Responded">Not Responded</option>
                    </select>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                    >
                        Update Response
                    </button>
                </div>
            </form>
        </div>
    );
}
