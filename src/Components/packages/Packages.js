import React from 'react';
import { Package_list } from './Package_List';
import { useNavigate } from 'react-router-dom';
import { Card, Button, CardGroup } from 'react-bootstrap';
import './Package.css'; 

function Packages() {
  const navigate = useNavigate();
  return (
    <>
      <div className='container'>
        <div className='row'>
          {Package_list.map((item) => (
            <CardGroup className='col-6 col-md-3' key={item.id}>
              <Card className='m-2 mt-4 md-3'>
                <div className='card-img-container'>
                  <Card.Img style={{ maxHeight: '12rem' }} src={item.Image} />
                </div>
                <Card.Body>
                  
                  <Card.Text className='destination-text'>{item.Destinaton}</Card.Text>
                  <Card.Text>
                    <span className='green-text'>{item.Duratuion}</span>
                  </Card.Text>
                  <Card.Text> Rs{item.Price}/Person</Card.Text>
                  <Button
                    variant='warning'
                    className='custom-button'
                    onClick={() => navigate(`/View Details/${item.id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </CardGroup>
          ))}
        </div>
      </div>
    </>
  );
}

export default Packages;
