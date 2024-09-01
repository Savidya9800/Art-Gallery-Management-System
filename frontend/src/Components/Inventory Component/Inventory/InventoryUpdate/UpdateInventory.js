import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateInventory() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;
  return (
    <div>
      <h1>UPDATE INVENTORY</h1>
    </div>
  )
}

export default UpdateInventory
