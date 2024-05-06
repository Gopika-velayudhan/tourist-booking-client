import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "./HoneyMoon.css";

const Adventure = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await axios.get('http://localhost:3005/api/user/packages', {
                    params: { category: 'advanture' },
                    headers: headers
                });
                setPackages(response.data.data);
                console.log(response.data.data); 
            } catch (error) {
                console.error("Error fetching packages:", error); 
            }
        };
    
        fetchPackages();
    }, []);
    

    return (
        <>
            <Row className='m-4'>
                {packages.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} className='d-flex flex-wrap m-4'>
                        <Card className='m-2' style={{ width: '20rem' }}>
                            <Card.Img className='card-image' variant='top' src={item.Image} />
                            <Card.Body style={{ height: '15rem' }}>
                                <Card.Title className='m-2'>{item.Destination}</Card.Title>
                                <Card.Text><h2>₹{item.Price}</h2></Card.Text>
                                <Button onClick={() => navigate(`/viewproduct/${item.id}`)} variant="primary">Visit Your Dream</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Adventure;
