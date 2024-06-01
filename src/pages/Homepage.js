import React from 'react'


import Home from '../Components/home/Home'
import "../Components/home/Homepage.css"
import Footer from '../Components/footer/Footer'
import Contact from '../Components/home/Contact'



function Homepage() {
  return (
    <div>
        <Home />
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Homepage