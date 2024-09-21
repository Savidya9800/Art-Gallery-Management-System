
import React, {useState}from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import FooterComp from "../../Nav Component/FooterComp";
import NavigationBar from "../../Nav Component/NavigationBar";



export default function AddInquiry() {

    const history = useNavigate();

    const [inputs, setInputs] = useState({

        name: "",
        email: "",
        inquiryType: "",
        inquiryMessage: ""
    });

    const handleChange = (e) =>{
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

        const handleSubmit =  (e) => {
            e.preventDefault();
            console.log(inputs);
            sendRequest().then(()=>history('/mainInquary')); // navigate after submit
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/inquiry",{

            name: String(inputs.name),
            email: String(inputs.email),
            inquiryType: String(inputs.inquiryType),
            inquiryMessage: String(inputs.inquiryMessage),

        }).then((res) => res.data);

    };
return (
    <div>
    <NavigationBar/>
        
        <h1>Add Inquiry</h1>

        <form onSubmit={handleSubmit}>
            <label>Name : </label>
        <input type="text" name="name" onChange={handleChange} value={inputs.name} required></input>
            <br></br>   
            <label>Email : </label>

            <input type="email" name="email" onChange={handleChange} value={inputs.email} required></input>
            <br></br>       
           
      
            <label>Date : </label>
            <input type="date" name="date" onChange={handleChange} value={inputs.date} required></input>
            <br></br>   
            <label>Inquiry Type : </label>
            <input type="text" name="inquiryType" onChange={handleChange} value={inputs.inquiryType} required></input>
            min ={new Date().toISOString().split('T')[0]}
            <br></br>
            <label>Inquiry Message : </label>
            
            <input type="text" name="inquiryMessage" onChange={handleChange}  value={inputs.inquiryMessage}required></input>
            <br></br>
            <button type="submit" id="submitbtn">Add Inquiry</button>

        </form>
        <FooterComp/>
    </div>

);



}