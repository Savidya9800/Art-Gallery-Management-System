import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShopComp(props) {
  const {_id, productname, price, itemCount, date} = props.INVENTORY;

  // Delete function
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/inventory/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/itemview"));
  };

  return (
    <tr>
      <td className="px-6 py-3">{_id}</td>
      <td className="px-6 py-3">{productname}</td>
      <td className="px-6 py-3">LKR {price.toFixed(2)}</td>
      <td className="px-6 py-3">{itemCount}</td>
      <td className="px-6 py-3">{new Date(date).toLocaleDateString()}</td>
      <td className="px-6 py-3 flex gap-2">
        <Link to={`/itemview/${_id}`} className="bg-yellow-500 text-white px-4 py-1 rounded">
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
