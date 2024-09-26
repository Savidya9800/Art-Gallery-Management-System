import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Viewresponses(props){


    const {_id,response,inquirystatus,date} = props.RESPONSE;

    const history = useNavigate();
    const deleteHandler = async () => {

        await axios.delete(`http://localhost:5000/adminResponse/${_id}`)
        .then(res=>res.data)
        .then(() => history("/"))
        .then(() => history("/adminResponses"));
    }

    

    return (
        <div>

            <h1>Responses</h1>
            <br></br>

            <h1>ID : {_id}</h1>
            <br></br>
            <h1>Response : {response} </h1>
            <br></br>

            <h1>Status : {inquirystatus}</h1>
            <br></br>

            <h1>Date : {date}</h1>
            <br></br>

            <Link to={`//${_id}`}>Update
            
            </Link>


            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Update</button>
            <button className="px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-red-600 transition" >Delete</button>


        </div>
    );

}