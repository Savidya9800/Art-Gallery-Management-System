import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Bids(props) {
    const {_id,name, email, amount} = props.bidding;  //here bidding is what was used as assumed in ViewBid.js

    const history = useNavigate();
//delete function
const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bid?");
    if (confirmDelete) {
        await axios.delete(`http://localhost:5000/bidding/${_id}`)
            .then(res => res.data)
            .then(() => history("/"))
            .then(() => history("/mainViewBid"));
    }
}




  return (
    <div className="flex justify-center items-center p-5">
            <div className="border-2 border-black p-5 rounded-lg shadow-lg w-full max-w-3xl">
                <form>
                    <div className="space-y-4">
                        <div className="p-4 mb-4 shadow-md border-2 border-[#A78F51] rounded-md"> 
                            <h2 className="m-0 text-gray-800">ID: {_id}</h2>
                        </div>

                        <div className="p-4 mb-4 shadow-md border-2 border-[#A78F51] rounded-md"> 
                            <h2 className="m-0 text-gray-800">Name: {name}</h2>
                        </div>

                        <div className="p-4 mb-4 shadow-md border-2 border-[#A78F51] rounded-md"> 
                            <h2 className="m-0 text-gray-800">Email: {email}</h2>
                        </div>

                        <div className="p-4 mb-4 shadow-md border-2 border-[#A78F51] rounded-md"> 
                            <h2 className="m-0 text-gray-800">Amount: {amount}</h2>
                        </div>

                        <div className="flex justify-between mt-5">
                            <Link to={`/mainViewBid/${_id}`} 
                            className="bg-[#A78F51] text-white py-2 px-5 rounded-md hover:opacity-90">Update</Link>
                            <button type="button" onClick={deleteHandler} 
                             className="bg-[#c5b358] text-white py-2 px-5 rounded-md hover:opacity-90">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
           
        </div>
        
  )
}

export default Bids



