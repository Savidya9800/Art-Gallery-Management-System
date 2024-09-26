import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'
import { useNavigate } from 'react-router-dom'

function NewsFeedComp() {
  const navigate = useNavigate();
  return (
    <div>
      <NavigationBar/>
      <h1>News</h1>

    <button type='submit' onClick={()=> navigate("/Addresponse")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> Add Response </button> 
    <br></br>
    <br></br>
    <button type='submit' onClick={()=> navigate("/Viewresponse")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> View Response </button>

      <FooterComp/>
    </div>
  )
}

export default NewsFeedComp
