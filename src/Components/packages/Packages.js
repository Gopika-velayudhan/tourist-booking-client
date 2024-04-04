import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import holiday1 from '../Assests/holiday1.jpg';
import './Package.css'

function Packages() {
  return (
    <Card className="custom-card" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={holiday1} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Packages;
