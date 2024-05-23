import axios from 'axios';
import React from 'react';
import { Card,CardBody, Row,Col} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Booking() {
  const [booking,setBooking] = useState(null)
  const {id} = useParams()


  useEffect(()=>{
    const handlebookingget = async(id)=>{
      try{
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get (`http://localhost:3005/api/user/booking/${id}`,{headers})
        if(response.status === 200 ){
          setBooking(response.data.data)
        }
      

      }catch(err){
        console.error(err)
        

      }
    }
    handlebookingget()


  },[id])




  
  return (
    <Row className='mt-4'>
      <Col lg={3}>
      <Card>
        <CardBody>

        </CardBody>
      </Card>

      </Col>
    </Row>
  )
}

export default Booking