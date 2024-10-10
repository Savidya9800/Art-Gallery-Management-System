import React, { useState } from "react";
import NavigationBar from "../../Nav Component/NavigationBar";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to access URL parameters
import axios from "axios";

export default function Addresponse() { 
    const { id: inquiryID } = useParams(); // Get inquiryID from URL parameters
    const history = useNavigate();

    const [inputs, setInputs] = useState({
        response: "",
        inquirystatus: "Select", 
    });

    const [error, setError] = useState(""); 

    const handlechange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setError(""); // Clear the error when user changes inputs
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (inputs.inquirystatus === "Select") {
            setError("**Please select a valid inquiry status.**");
            return;
        }

        console.log(inputs);
        sendRequest().then(() => history(`/ViewResponse/${inquiryID}`));
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/adminResponse", {
            response: String(inputs.response),
            inquirystatus: String(inputs.inquirystatus),
            inquiryID: inquiryID // Include the inquiry ID in the request
        }).then((res) => res.data);
    };

    return (
        <div>
            <NavigationBar />
            <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
                <h1 className={"text-center text-2xl font-semibold text-gray-600 mb-8"}>Add Response</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Response :</label>
                        <input
                            type="text"
                            name="response"
                            onChange={handlechange}
                            value={inputs.response}
                            required
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Status :</label>
                        <select
                            name="inquirystatus"
                            onChange={handlechange}
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

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error if validation fails */}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Add Response
                    </button>
                </form>
            </div>
        </div>
    );
}
