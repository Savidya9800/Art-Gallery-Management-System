import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import NavigationBar from '../../Nav Component/NavigationBar'




 

function CreateBid() {

  const history = useNavigate();
  //insert data set calling
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    amount:"",

  })

    const handleChange = (e)=>{
      setInputs((prevState)=> ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    };

    //when submit button is clicked
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(inputs);
      sendRequest().then(()=>history('/mainViewBid'));
      
    }

    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/bidding", {
        name: String (inputs.name),
        email: String (inputs.email),
        amount: Number (inputs.amount)

      }).then(res => res.data);
    }

    return (
      <div>
      <NavigationBar/>
      <div className="flex justify-center items-center h-screen">
        <div className="p-10  rounded-lg shadow-lg w-[500px] border-2 border-black">
          <h1 className="text-2xl text-[#A78F51] text-center mb-6">Insert Bid</h1>
          <form onSubmit={handleSubmit}>

            <label className="block text-lg text-gray-800 mb-2">Enter Name</label>
            <input type="text" name="name" onChange={handleChange} value={inputs.name} placeholder="Enter Name" required
              className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

            <label className="block text-lg text-gray-800 mb-2">Enter Email</label>
            <input type="email" name="email" onChange={handleChange} value={inputs.email} placeholder="Enter Email (for contact purposes)" required
              className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

            <label className="block text-lg text-gray-800 mb-2">Enter Amount</label>
            <input type="number" name="amount" onChange={handleChange} value={inputs.amount} placeholder="Enter Amount" required
              className="w-full p-2 mb-4 border border-black rounded-md text-sm" />

            <div className="text-center">
              <button type="submit" className="bg-[#A78F51] text-white px-5 py-3 rounded-md transition duration-300 hover:bg-[#8F7741] text-lg"
                >Submit bid</button>
            </div>

          </form>
        </div>
      </div>
      </div>
  )
}

export default CreateBid   
//insert