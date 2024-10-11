import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShopComp(props) {
  const {_id, productname, price, itemCount, date, image} = props.INVENTORY; 

  const formattedId = `PID${_id.slice(-4)}`;


  const history = useNavigate();

  // Delete function
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/inventory/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/itemview"));
  };

  return (
    <tr>
      <td className="px-6 py-3">{formattedId}</td>
      <td className="px-6 py-3">{productname}</td>
      <td className="px-6 py-3">LKR {price.toFixed(2)}</td>
      <td className="px-6 py-3">{itemCount}</td>
      <td className="px-6 py-3">{new Date(date).toLocaleDateString()}</td>
      <td className="px-6 py-3">
        {image ? ( 
          <img
          src={`http://localhost:5000/images/${image}`} //display img
          alt={productname}
          className="w-16 h-16 object-cover"
        />        
        ) : (
          <span>No Image</span> 
        )}
      </td>
      <td className="px-6 py-3 flex gap-2">
        <Link to={`/itemview/${_id}`} className="bg-blue-500 text-white px-4 py-1 rounded">
          Edit
        </Link>
        <button 
          onClick={deleteHandler} 
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ShopComp;
