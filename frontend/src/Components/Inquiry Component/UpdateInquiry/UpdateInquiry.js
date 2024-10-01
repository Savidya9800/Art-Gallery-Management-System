import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';

export default function UpdateInquiry() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        inquiryType: '',
        inquiryMessage: ''
    });

    const history = useNavigate();
    const id = useParams().id;

    useEffect(() => {
        const fetchHandler = async () => {
            await axios.get(`http://localhost:5000/inquiry/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.inquiryData));
        };

        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/inquiry/${id}`, {
            name: String(inputs.name),
            email: String(inputs.email),
            inquiryType: String(inputs.inquiryType),
            inquiryMessage: String(inputs.inquiryMessage),
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
        try {
            sendRequest().then(() => history('/inquiries')); // navigate after submit
        } catch (error) {
            console.error("Error during form submission", error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="border-2 border-black rounded-lg shadow-md p-5 mx-auto my-5 w-full max-w-xl">
                <h1 className="text-3xl font-bold text-center text-black-500 mb-4">Update Inquiry</h1>

                <form onSubmit={handleSubmit}>
                    <div className="p-6 rounded-md">
                        <div className="mb-4">
                            <label className="text-xl font-semibold text-gray-700">Name:</label>
                            <input 
                                type="text" 
                                name="name" 
                                onChange={handleChange} 
                                value={inputs.name} 
                                required 
                                className="border-2 border-black rounded w-full py-2 px-3" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-xl font-semibold text-gray-700">Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                onChange={handleChange} 
                                value={inputs.email} 
                                required 
                                className="border-2 border-black rounded w-full py-2 px-3" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-xl font-semibold text-gray-700">Inquiry Type:</label>
                            <input 
                                type="text" 
                                name="inquiryType" 
                                onChange={handleChange} 
                                value={inputs.inquiryType} 
                                required 
                                className="border-2 border-black rounded w-full py-2 px-3" 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-xl font-semibold text-gray-700">Inquiry Message:</label>
                            <input 
                                type="text" 
                                name="inquiryMessage" 
                                onChange={handleChange} 
                                value={inputs.inquiryMessage} 
                                required 
                                className="border-2 border-black rounded w-full py-2 px-3" 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                            Update Inquiry
                        </button>
                    </div>
                </form>
            </div>
            <FooterComp />
        </div>
    );
}
