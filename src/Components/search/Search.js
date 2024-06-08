import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const [search, setSearch] = useState({ location: '', duration: '', price: '' });
  const [packageToShow, setPackageToShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const searchParams = new URLSearchParams(location.search);
        const locationQuery = searchParams.get('location');
        const durationQuery = searchParams.get('duration');
        const priceQuery = searchParams.get('price');

        setSearch({ location: locationQuery, duration: durationQuery, price: priceQuery });

        const response = await axios.get(`http://localhost:3005/api/user/searches?location=${locationQuery}&duration=${durationQuery}&price=${priceQuery}`, { headers });
        const data = response.data.data;
        
        const foundPackage = data.find((pack) => 
          pack.Destination.toLowerCase() === locationQuery.toLowerCase() &&
          pack.Duration === Number(durationQuery) &&
          pack.Price === Number(priceQuery)
        );
        setPackageToShow(foundPackage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching properties:', error);
        if(error.response && error.response.status == 404){
          setError('No packages found for the specified criteria');
        }
       
        setLoading(false);
      }
    };

    fetchPackages();
  }, [location]);

  return (
    <div className="px-4 py-8">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : packageToShow ? (
        <div className="bg-white p-4">
          <Card key={packageToShow._id} className="relative w-64 h-100">
            <Card.Img
              variant="top"
              src={packageToShow.images[0]} 
              alt={packageToShow.Destination}
              className="object-cover h-40"
            />
            <Card.Body>
              <Card.Title>{packageToShow.Destination}</Card.Title>
              <Card.Text>
                <p>Price: ${packageToShow.Price}</p>
                <p>Duration: {packageToShow.Duration} days</p>
              </Card.Text>
              
              <Button variant="primary" onClick={() => navigate(`/singlepack/${packageToShow._id}`)}>
                View Dreams
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <div className="text-center">No package found for "{search.location}" with duration "{search.duration}" and price "{search.price}".</div>
      )}
    </div>
  );
}

export default Search;
