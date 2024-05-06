import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import "./HoneyMoon.css";

const Family = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                const response = await axios.get('http://localhost:3005/api/user/packages', {
                    params: { category: 'family' },
                    headers: headers
                });
                setPackages(response.data.data);
                setLoading(false);
                console.log("Fetched data:", response.data.data);
            } catch (error) {
                setLoading(false);
                setError(error);
                console.error("Error fetching packages:", error);
            }
        };
    
        fetchPackages();
    }, []);

    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Packages:", packages);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || packages.length === 0) {
        return <p>No packages found for the specified category.</p>;
    }

    return (
        <>
            <Row className='m-4'>
                {packages.map(item => (
                    <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} className='d-flex flex-wrap m-4'>
                        <Card className='m-2' style={{ width: '20rem' }}>
                            <Card.Img className='card-image' variant='top' src={item.images} />
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

export default Family;
