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

        <div   className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-xl mt-8"> 
            
            <h1 className="text-3xl font-bold text-center text-black-500 mb-4">Display Inquiries</h1>

            <div className="bg-gray-50 p-6 rounded-md">

                <div className="mb-4">
                <h1 h2 className="text-xl font-semibold text-gray-700">Name : {name}</h1>
                </div>

                <div className="mb-4">
                <h1 h2 className="text-xl font-semibold text-gray-700">Email : {email}</h1>
                </div>  

                <div className="mb-4">
                <h1 h2 className="text-xl font-semibold text-gray-700">Date : {date}</h1>
                </div>

                <div className="mb-4">
                <h1 h2 className="text-xl font-semibold text-gray-700">Inquiry Type : {inquiryType}</h1>
                </div>

                <div className="mb-4"><div className="mb-4">
        
                    <h1 h2 className="text-xl font-semibold text-gray-700">Inquiry Message : {inquiryMessage}</h1>
                    </div>

                </div>
                </div>
                <h1>Status : </h1>
                <div className="flex space-x-4 mt-6">
                <Link to={`/updateInquiry/${_id}`} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Update</Link>

                <button onClick={deleteHandler} className="px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-red-600 transition" >Delete</button>
                <br/><br/>
                </div>
            </div>

    )
}
