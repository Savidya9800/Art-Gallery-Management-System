import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateResponse() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;
    
    useEffect(() => {
        const fetchHandler = async () => {
            await axios
            .get(`http://localhost:5000/adminResponse/${id}`)
                .then(res => res.data)
                .then(data => setInputs(data))
        }
        fetchHandler();

    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/adminResponse/${id}`, {
            
            response: String(inputs.response),
            inquirystatus: String(inputs.inquirystatus),
            date: String(inputs.date),

        })

        .then((res) => res.data);
    };

    const handlechange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history("/adminResponses"));
    };


    return (
        <div>
            <h1>Update Response</h1>
            <br></br>

            <form onSubmit={handleSubmit}>
                <label>Response</label>
                <input type="text" name="response" onChange={handlechange} value={inputs.response}></input>
                <br></br>
                <label>Status</label>
                <input type="text" name="inquirystatus" onChange={handlechange} value={inputs.inquirystatus}></input>
                <br></br>
                <label>Date</label>
                <input type="date" name="date"  onChange={handlechange} value={inputs.date}></input>
                <br></br>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Update Response</button>
            </form>

        </div>
    );
}