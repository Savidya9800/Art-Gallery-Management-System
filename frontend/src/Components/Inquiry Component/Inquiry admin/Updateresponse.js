import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../Nav Component/NavigationBar"; // Add NavigationBar

export default function UpdateResponse() {
    const [inputs, setInputs] = useState({
        response: "",
        inquirystatus: "Select", // Ensure default select option is consistent
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // Error state for validation
    const history = useNavigate();
    const { id, inquiryID } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/adminResponse/${id}`);
                const data = res.data;

                setInputs({
                    response: data.response || "",
                    inquirystatus: data.inquirystatus || "Select"
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/adminResponse/${id}`, {
            response: String(inputs.response),
            inquirystatus: String(inputs.inquirystatus),
            inquiryID: inquiryID
        }).then((res) => res.data);
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setError(""); // Clear error on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate the inputs
        if (inputs.response.trim() === "") {
            setError("**Response field cannot be empty.**");
            return;
        }
        
        if (inputs.inquirystatus === "Select") {
            setError("**Please select a valid inquiry status.**");
            return;
        }

        sendRequest().then(() => history(`/Viewresponse/${inquiryID}`));
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <NavigationBar /> {/* Include NavigationBar */}
            <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
                <h1 className={"text-center text-2xl font-semibold text-gray-600 mb-8"}>Update Response</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Response :</label>
                        <input
                            type="text"
                            name="response"
                            onChange={handleChange}
                            value={inputs.response}
                            required
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Status :</label>
                        <select
                            name="inquirystatus"
                            onChange={handleChange}
                            value={inputs.inquirystatus}
                            required
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        >
                            <option value="Select">Select</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Pending">Pending</option>
                            <option value="Not Responded">Not Responded</option>
                        </select>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error */}

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                        >
                            Update Response
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
