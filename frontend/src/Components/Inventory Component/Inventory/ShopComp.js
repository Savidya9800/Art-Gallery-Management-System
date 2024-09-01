import React from 'react';
//import { Link } from 'react-router-dom';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

function ShopComp(props) {
  const { INVENTORY } = props;
  //const histroy = useNavigate();

  if (!INVENTORY) {
    return null; // Or display a loading/error message
  }

  const { _id,productname,price,itemCount,date } = INVENTORY;

  return (
    <div>
      <h6>product Code:{_id}</h6>
      <h6>Product Name:{productname}</h6>
      <h6>Price:{price}</h6>
      <h6>Item Count:{itemCount}</h6>
      <h6>Date:{date}</h6>
      <br></br>
      <button type="button">Update</button>
      <button type="button">Delete</button>
      <br></br><br></br>
    </div>
  );
}

export default ShopComp
