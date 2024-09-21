import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Viewinquiries(props) {



    const {_id,name,email,date,inquiryType,inquiryMessage} = props.INQUIRY;

    const history = useNavigate();

    const deleteHandler = async () => {

        await axios.delete(`http://localhost:5000/inquiry/${_id}`)
        .then(res=>res.data)
        .then(() => history("/"))
        .then(() => history("/inquiries"));
    };
    return (

        
        <div>
            
            <h1>Display Inquiries</h1>

            <div>

                <h1>Name:{name}</h1>
                <h1>Email:{email}</h1>
                <h1>Date:{date}</h1>
                <h1>Inquiry Type:{inquiryType}</h1>
                <h1>Inquiry Message:{inquiryMessage}</h1>
                <Link to={`/updateInquiry/${_id}`}>Update</Link>

                <button onClick={deleteHandler}>Delete</button>
                <br/><br/>

            </div>
        </div>
    )
}