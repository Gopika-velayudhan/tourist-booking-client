import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import { Row, Col, Card } from "react-bootstrap"; 
import instance from "../../axiosinterceptor/Axiosinterceptor";

const Adminsingle = () => {
  const { id } = useParams();
  const [packag, setPackage] = useState(null); 

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await instance.get(`/api/admin/packages/${id}`);
        response.data.data.Available_Date = new Date(response.data.data.Available_Date);
        setPackage(response.data.data);
      } catch (err) {
        console.error("Error fetching single package", err);
      }
    };

    if (id) {
      fetchPackage();
    }
  }, [id]);

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-8">
        {packag && ( 
          <Col lg={15}> 
            <Card className="mb-4">
              <Card.Body>
                <Card.Title className="text-center">
                  {packag.Destination} 
                </Card.Title>
                <div className="photoarray">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3">
                      <Card.Img
                        className="main-image"
                        src={packag.images[0]} 
                        alt={`Image 1 of ${packag.Destination}`} 
                      />
                    </div>
                    {packag.images.slice(1).map((image, index) => (
                      <div key={index} className="col-span-1">
                        <Card.Img
                          className="secondary-image"
                          src={image}
                          alt={`Image ${index + 2} of ${packag.Destination}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <h4>Plan Of The Trip</h4>
                  <p>{packag.Description}</p>
                  <h5>₹{packag.Price}-/Day</h5> 
                  <h5>{packag.Category}</h5> 
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </div>
    </div>
  );
};

export default Adminsingle;
