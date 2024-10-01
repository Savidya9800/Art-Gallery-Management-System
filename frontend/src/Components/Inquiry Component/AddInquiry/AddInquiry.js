import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";

export default function AddInquiry() {
    const history = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        date: new Date().toISOString().split('T')[0], // Default to today's date
        inquiryType: "",
        inquiryMessage: ""
    });

    const [error, setError] = useState(""); // Validation error handling 

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Ensure the date selected is today's date only
        const currentDate = new Date().toISOString().split('T')[0];
        if (inputs.date !== currentDate) {
            setError("**You can only select today's date for the inquiry**");
            return;
        }

        console.log(inputs);
        sendRequest().then(() => {
            alert("Inquiry has been submitted Successfully!");
            history('/mainInquary');   // navigate after submit
        });
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/inquiry", {
            name: String(inputs.name),
            email: String(inputs.email),
            date: inputs.date,
            inquiryType: String(inputs.inquiryType),
            inquiryMessage: String(inputs.inquiryMessage),
        }).then((res) => res.data);
    };

    return (
        <div>
            <NavigationBar />
            <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
                <h1 className={"text-center text-2xl font-semibold text-gray-600 mb-8"}>Add Inquiry</h1>
                <form 
                    onSubmit={handleSubmit} 
                    className="border border-black p-4" // Add black border to form
                >
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Name :</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={inputs.name}
                            required
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Email :</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={inputs.email}
                            required
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Date :</label>
                        <input
                            type="date"
                            name="date"
                            onChange={handleChange}
                            value={inputs.date}
                            required
                            min={new Date().toISOString().split('T')[0]} // Set min date to today
                            max={new Date().toISOString().split('T')[0]} // Set max date to today
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Inquiry Type :</label>
                        <input
                            type="text"
                            name="inquiryType"
                            onChange={handleChange}
                            value={inputs.inquiryType}
                            required
                            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Inquiry Message :</label>
                        <input
                            type="text"
                            name="inquiryMessage"
                            onChange={handleChange}
                            value={inputs.inquiryMessage}
                            required
                           className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <p className="text-red-500"> Today: {new Date().toISOString().split('T')[0]}</p>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
                        id="submitbtn"
                    >
                        Add Inquiry
                    </button>
                </form>
            </div>
            <FooterComp />
        </div>
    );
}
