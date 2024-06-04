import React from 'react'


import Home from '../Components/home/Home'
import "../Components/home/Homepage.css"
import Footer from '../Components/footer/Footer'
import Contact from '../Components/home/Contact'
import About from '../Components/home/About'
import Service from '../Components/home/Service'
import Banner from '../Components/home/Banner'



function Homepage() {
  return (
    <div>
        <Home />
        <About/>
        <Service/>
        <Banner/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Homepage