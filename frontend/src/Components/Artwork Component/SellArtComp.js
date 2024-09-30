import React from 'react'
import FooterComp from '../Nav Component/FooterComp'
import NavigationBar from '../Nav Component/NavigationBar'
import './sellArt.css'
import { Link } from 'react-router-dom'

function SellArtComp() {
  return (
    <div>
      <NavigationBar/>
        <h1>Sell Art</h1>
        <Link to="/mainArtworkDetails"><button type="button" class="btn btn-primary">Artwork Details</button></Link>
        <br></br>
        <br></br>
        <Link to="/mainAddArtwork"><button type="button" class="btn btn-primary">Add Artwork</button></Link>
        <FooterComp/>
    </div>
  )
}

export default SellArtComp
