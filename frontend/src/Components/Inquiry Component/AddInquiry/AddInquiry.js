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
        date: "",
        inquiryType: "",
        inquiryMessage: ""
    });
    
const [error, setError] = useState(""); // Validation error handling 

    const handleChange = (e) =>{
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

        const handleSubmit =  (e) => {
            e.preventDefault();

            // Validation calculate the curent date and the enterd date 

            const currentDate = new Date();
            const enteredDate = new Date(inputs.date);
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(currentDate.getDate() - 7); // 7 days ago date 

            //Validate the selected date is wrong or correnct

            if (enteredDate < sevenDaysAgo || enteredDate > currentDate) {
                setError("**Inquiry can only be made within 7 days of the current date**");  // Invalid date error message is here 
                return;
            }

            console.log(inputs);
            sendRequest().then(()=>{
                alert("Inquiry has been submitted Successfully ! ");
                history('/mainInquary')   // navigate after submit
        }); 

        
            
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/inquiry",{

            name: String(inputs.name),
            email: String(inputs.email),
            date: String(inputs.date),
            inquiryType: String(inputs.inquiryType),
            inquiryMessage: String(inputs.inquiryMessage),

        }).then((res) => res.data);

    };
return (
    <div>
    <NavigationBar/>
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-md border border-gray-200">

        <h1 className={"text-center text-2xl font-semibold text-gray-600 mb-8"}>Add Inquiry</h1>

        <form onSubmit={handleSubmit}>

        <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Name : </label>
        <input type="text" name="name" onChange={handleChange} value={inputs.name} 
        required   className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
            <br></br>  
            </div>


            <label className="block text-gray-700 font-medium mb-2">Email : </label>

            <input type="email" name="email" onChange={handleChange} value={inputs.email} 
            required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
            <br></br>       

            <label  className="block text-gray-700 font-medium mb-2" >Date : </label>
            <input type="date" name="date" onChange={handleChange} value={inputs.date} required
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
            <br></br>  

            <label  className="block text-gray-700 font-medium mb-2">Inquiry Type : </label>
            <input type="text" name="inquiryType" onChange={handleChange} value={inputs.inquiryType} 
            required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"></input>

            <br></br>
            <label  className="block text-gray-700 font-medium mb-2">Inquiry Message : </label>
            
            <input type="text" name="inquiryMessage" onChange={handleChange}  value={inputs.inquiryMessage}
            required className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
            <br></br>
            {error && <p className="text-red-500 mb-4" >{error}</p>}

        <p className="text-red-500"> Today : {new Date().toISOString().split('T')[0]}<br></br></p>

            <button type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" id="submitbtn">Add Inquiry</button>

        </form>
        </div>
        <FooterComp/>
    </div>

);



}