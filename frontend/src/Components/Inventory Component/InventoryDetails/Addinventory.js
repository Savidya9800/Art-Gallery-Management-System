import React, { UseState } from 'react'
import NavigationBar from '../../Nav Component/NavigationBar'
import { useNavigate } from 'react-router';
import axios from 'axios';

function Addinventory() {
    const history = useNavigate();
    const [inputs,setInputs] = UseState({
      productname:"",
      price:"",
      itemCount:"",
      date:"",
    });
    const handleChange = (e)=>{
      setInputs((prevState)=> ({
        ...prevState,
        [e.target.name]: e.value,
      }));
    };

    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(inputs);
      sendRequest().then(()=>history("mainInventory"))
    }

    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/inventory",{
        productname: String(inputs.productname),
        price: Number(inputs.price),
        itemCount: Number(inputs.itemCount),
        date: Date(inputs.date),
      }).then(res => res.data);
    }
  return (
    <div>
        <NavigationBar/>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <label>productname</label>
        <br></br>
        <input type="text" name="productname" onChange={handleChange} value={inputs.productname} required></input>

        <label>price</label>
        <br></br>
        <input type="text" name="price" onChange={handleChange}  value={inputs.price} required></input>

        <label>itemCount</label>
        <br></br>
        <input type="text" name="itemCount" onChange={handleChange} value={inputs.itemCount} required></input>

        <label>date</label>
        <br></br>
        <input type="text" name="date" onChange={handleChange} value={inputs.date} required></input>
        <br></br><br></br>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Addinventory