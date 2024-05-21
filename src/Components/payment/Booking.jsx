import React from 'react';
import { useState } from 'react';

function Booking() {
  const [booking,setBooking] = useState(null)

  const handlebooking = async()=>{
    try{
      const token = localStorage.getItem("token")
      const userid  = localStorage.getItem('userId')

    }catch(err){
      console.error(err,"error submitting ")
    }
  }
  return (
    <div>
        
    </div>
  )
}

export default Booking