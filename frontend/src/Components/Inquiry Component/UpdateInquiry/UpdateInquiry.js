import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../Nav Component/NavigationBar';
import FooterComp from '../../Nav Component/FooterComp';



export default function UpdateInquiry(){

    const [inputs,setInputs] = useState({

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

    },[id]);

    const sendRequest = async () =>{
        await axios 
        .put(`http://localhost:5000/inquiry/${id}`,{


            name: String(inputs.name),
            email: String(inputs.email),
            inquiryType: String(inputs.inquiryType),
            inquiryMessage: String(inputs.inquiryMessage),
        })
        .then((res) => res.data);
        };

        const handleChange = (e) =>{
            setInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        };
    
            const handleSubmit =  (e) => {
                e.preventDefault();
                console.log(inputs);
                try{
                sendRequest().then(()=>
                    history('/inquiries')); // navigate after submit
            }catch (error) {
                console.error("Error during form submission", error);
            }
        };


    return(
        <div>
            <NavigationBar/>
            
            <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-xl mt-8" >

        <h1 className="text-3xl font-bold text-center text-black-500 mb-4">Update Inquiry</h1>

        
        <form onSubmit={handleSubmit}>
            <div  className="bg-gray-50 p-6 rounded-md">

            
            <label className="text-xl font-semibold text-gray-700">Name : </label>
            
            <input type="text" name="name" onChange={handleChange} value={inputs.name} required ></input>
            <br/>
            <label className="text-xl font-semibold text-gray-700">Email : </label>

            <input type="email" name="email" onChange={handleChange} value={inputs.email} required ></input>
            <br/>

            <label className="text-xl font-semibold text-gray-700">Inquiry Type : </label>

            <input type="text" name="inquiryType" onChange={handleChange} value={inputs.inquiryType} required ></input>
            <br/>
            <label className="text-xl font-semibold text-gray-700">Inquiry Message : </label>
            
            <input type="text" name="inquiryMessage" onChange={handleChange}  value={inputs.inquiryMessage}required ></input>
            <br/>
            
            <button type="submit" className="px-4 py-2 bg-yellow-500 bg-center text-white rounded-md hover:bg-yellow-600 transition" >Update Inquiry</button>
            </div>
        </form>
        
    </div>
    <FooterComp/>
    </div>
    
    )
}