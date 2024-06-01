import React, { useState,useEffect } from 'react'
import instance from '../../axiosinterceptor/Axiosinterceptor'

function AdminBooking() {
    const [booking,setBooking] = useState([])
    useEffect(()=>{
        const fetchbooking = async()=>{
            try{
                const response = await instance.get('/bookings')
                setBooking(response.data.data)
            }catch(err){
                console.log(err);
            }
        }
        
          fetchbooking()  
        
    },[])
  return (
    <div>
        <div>
            <table>
                
            </table>
        </div>
    </div>
  )
}

export default AdminBooking