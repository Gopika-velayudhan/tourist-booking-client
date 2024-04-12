import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { package_list } from '../packages/Package_List';
import "./HoneyMoon.css"

const Adavnture = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('Advanture');
    const filteredProducts = package_list.filter(item => item.Catagory === category);

    return (
        <>
            <Row className='m-4'>
                {filteredProducts.map(item => (
                    <Col key={item.Destination} xs={12} sm={6} md={4} lg={3} xl={3} className='d-flex flex-wrap m-4'>
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

export default Adavnture;
