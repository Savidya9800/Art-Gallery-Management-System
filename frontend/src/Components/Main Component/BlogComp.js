import React from 'react'
import NavigationBar from '../Nav Component/NavigationBar'
import FooterComp from '../Nav Component/FooterComp'

function Blog() {
  return (
    <div>
     <div className="relative z-10">
        <NavigationBar />
      </div>
        <h1>Blog</h1>
        <FooterComp/>
    </div>
  )
}

export default Blog
