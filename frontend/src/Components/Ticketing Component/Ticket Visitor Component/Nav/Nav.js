import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>
      <h1>Navingation</h1>
      <ul className='home-ul'>
        <li className='home-li'>
            <Link to='/mainhome' className='active home-a'>  
                <h1>Home</h1>
            </Link>
        </li>
      </ul>

      <ul className='home-ul'>
        <li className='home-li'>
            <Link to='/visitor' className='active home-a'>  
                <h1>Visitor</h1>
            </Link>
        </li>
      </ul>

      <ul className='home-ul'>
        <li className='home-li'>
            <Link to='/visitorDetails' className='active home-a'>  
                <h1>Visitor Detail</h1>
            </Link>
        </li>
      </ul>

      <ul className='home-ul'>
        <li className='home-li'>
            <Link to='/addVisitor' className='active home-a'>  
                <h1>Add Visitor</h1>
            </Link>
        </li>
      </ul>

      
    
    </div>
  )
}

export default Nav
