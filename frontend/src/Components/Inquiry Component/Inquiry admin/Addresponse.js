import React from "react";
import NavigationBar from "../../Nav Component/NavigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Addresponse() {

    const history = useNavigate();

    const [inputs,setInputs] = React.useState({

        response:"",
        inquirystatus:"",
        date:""
    });

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
    
    const sendRequest = async () => {
        await axios.post("http://localhost:5000/adminResponse", {
        
            response: String(inputs.response),
            inquirystatus: String(inputs.inquirystatus),
            date: String(inputs.date)
        }).then((res) => res.data);
        }

    return (
        <div>
            <NavigationBar/>
            <h1>Add Response</h1>
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
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Add Response</button>
            </form>
        </div>
    )
    
}