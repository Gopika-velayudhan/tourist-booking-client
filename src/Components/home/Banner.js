import React, { useEffect, useState } from 'react';
import instance from '../../axiosinterceptor/userinterrceptor';
import { useNavigate } from 'react-router-dom';
import './Banner.css';

function Banner() {
  const [pack, setPack] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchpack = async () => {
      try {
        const response = await instance.get("/getpackages");
        setPack(response.data.data.slice(0, 6)); 
      } catch (err) {
        console.log(err, "error fetching data");
      }
    };
    fetchpack();
  }, []);

  return (
    <div className="banner6">
      <h1 className="banner-title6">Explore Our Locations</h1>
      <div className="card-container6">
        <div className="card-row6">
          {pack.slice(0, 3).map((packageItem, index) => (
            <div key={index} className="card6">
              <img src={packageItem.images[1]} alt="Location" className="card-image6" onClick={()=>navigate("/honeymoon")}/>
              <h2 className="card-title6">{packageItem.Destination}</h2>
            </div>
          ))}
        </div>
        <div className="card-row6">
          {pack.slice(3, 6).map((packageItem, index) => (
            <div key={index} className="card6">
              <img src={packageItem.images[1]} alt="Location" className="card-image6" onClick={()=>navigate("/honeymoon")}/>
              <h2 className="card-title6">{packageItem.Destination}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
