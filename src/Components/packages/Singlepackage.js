import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./singlepackage.css";

function Singlepackage() {
  const [packages, setPackages] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchpackage = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `http://localhost:3005/api/user/packages/${id}`,
          { headers }
        );
        response.data.data.Available_Date = new Date(response.data.data.Available_Date);
        setPackages(response.data.data);
      } catch (err) {
        console.error("error fetching in package", err);
      }
    };
    if (id) {
      fetchpackage();
    }
  }, [id]);

  return (
    <>
      <div className="col-20 d-flex justify-content-center align-items-center">
        {packages && (
          <Card className="w-500" style={{ padding: "20px" }}>
            <Card.Title style={{ color: "black", fontFamily: "Arial, sans-serif", fontWeight: "bolder" }}>
              {packages.Destination}
            </Card.Title>
            <div className="photoarray">
              <div className="grid-container" style={{marginLeft:"100px"}}>
              
                <div className="photoitem large-image">
                  <Card.Img
                    className="mx-auto"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "25px" }}
                    variant="top"
                    src={packages.images[0]}
                    alt={`Image 1 of ${packages.Destination}`}
                  />
                </div>
                
                {packages.images.slice(1).map((image, index) => (
                  <div key={index} className="photoitem small-image">
                    <Card.Img
                      className="mx-auto"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "25px" }}
                      variant="top"
                      src={image}
                      alt={`Image ${index + 2} of ${packages.Destination}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Card.Body className="text-center">
              <Card.Title style={{ color: "white" }}>{packages.Destination}</Card.Title>
              <div style={{ maxWidth: "50%", textAlign: "center", margin: "0 auto" }}>
                <h2>Plan Of The Trip</h2>
                <p style={{ color: "black" }}>{packages.Description}</p>
                <h3 style={{ color: "black" }}>₹{packages.Price}-/</h3>
                <h3 style={{ color: "black" }}>{packages.Category}</h3>
                <h3 style={{ color: "black" }}>{packages.Available_Date.toLocaleDateString()}</h3>
              </div>
              <Button className="bg-primary" style={{ margin: "8px" }}>Book now</Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
}

export default Singlepackage;
