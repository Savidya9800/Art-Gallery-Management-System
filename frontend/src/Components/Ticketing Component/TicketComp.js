import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'
import { Link } from 'react-router-dom'

function TicketComp() {

  
  return (
    <div>
      
      <NavigationBar/>
      <h1>Ticket</h1>
      <Link to="/mainTicketAddVisitor"><button type="button" class="btn btn-primary">Confirm</button></Link>
      <FooterComp/>


    </div>
  )
}

export default TicketComp
