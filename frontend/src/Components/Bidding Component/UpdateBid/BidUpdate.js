import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'
import NavigationBar from '../../Nav Component/NavigationBar'


function BidUpdate() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;


    useEffect(() => {
        const fetchHandler = async ()=>{
            await axios.get(`http://localhost:5000/bidding/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.IDBidder))  //refer here we have to use the contant named used under controller class for get by Id part
        };
        fetchHandler();
    },[id]);

    const sendRequest = async() =>{
        await axios
        .put(`http://localhost:5000/bidding/${id}`,{
            name: String(inputs.name),
            email: String(inputs.email),
            amount: Number(inputs.amount)
        })

        .then((res) => res.data);
    }


    const handleChange = (e)=>{
        setInputs((prevState)=> ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };
  
      //when update button is clicked
      const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>{
          alert('Update was successful!')
          history('/mainViewBid')
      });
      }






  return (
    <div>
       <NavigationBar/>
             <div className="flex justify-center items-center h-screen">
            <div className="p-10 border-2 border-black rounded-lg shadow-lg w-full max-w-lg">
             <h1 className="text-2xl text-[#A78F51] text-center mb-6">Update Bid</h1>
               
                   <form onSubmit={handleSubmit}>
                        <label className="text-base text-gray-700 mb-2 block">Enter Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={inputs.name}
                            placeholder="Enter Name"
                            required
                            className="w-full p-3 mb-4 border border-black rounded-md text-sm"
                        />

                        <label className="text-base text-gray-700 mb-2 block">Enter Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={inputs.email}
                            placeholder="Enter Email (for contact purposes)"
                            required
                            className="w-full p-3 mb-4 border border-black rounded-md text-sm"
                        />

                        <label className="text-base text-gray-700 mb-2 block">Enter Amount</label>
                        <input
                            type="number"
                            name="amount"
                            onChange={handleChange}
                            value={inputs.amount}
                            placeholder="Enter Amount"
                            required
                            className="w-full p-3 mb-4 border border-black rounded-md text-sm"
                        />

               <div className="text-center">
              <button type="submit" className="bg-[#A78F51] text-white py-3 px-6 text-lg rounded-md hover:bg-[#8F7741] transition ease-in-out duration-300"
                >Update bid Details</button>
                  </div>
                    </form>
                </div>
            </div>
            </div>
  )
}

export default BidUpdate
