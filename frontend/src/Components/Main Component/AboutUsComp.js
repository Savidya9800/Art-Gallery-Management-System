import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'

function AboutUsComp() {
  return (
    <div>
      <div className="relative z-10">
        <NavigationBar />
      </div>
      <h1>About Us</h1>
      <FooterComp/>
    </div>
  )
}

export default AboutUsComp
