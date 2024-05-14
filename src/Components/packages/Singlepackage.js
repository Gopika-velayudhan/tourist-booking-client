import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./singlepackage.css";

function Singlepackage() {
  const [packages, setPackages] = useState(null);
  const { id } = useParams();
  const [formState, setFormState] = useState({
    availableDate: "",
    days: 0,
    price: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const totalPrice = () => {
    if (packages) {
      const calculatedTotal = formState.days * packages.Price;
      setFormState((prevState) => ({
        ...prevState,
        price: calculatedTotal
      }));
    }
  };

  useEffect(() => {
    const fetchPackage = async () => {
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
        console.error("error fetching package", err);
      }
    };
    if (id) {
      fetchPackage();
    }
  }, [id]);

  useEffect(() => {
    if (formState.days) {
      totalPrice();
    }
  }, [formState.days, packages]);

  return (
    <>
      <div className="col-20 d-flex justify-content-center align-items-center flex-grow">
        {packages && (
           <Card className="w-500 p-6">
            <Card.Title className="text-black font-bold text-2xl text-center">
              {packages.Destination}
            </Card.Title>
            <div className="photoarray">
              <div className="grid grid-cols-3 gap-4 justify-center">
                <div className="col-span-3">
                  <Card.Img
                    className="mx-auto w-full h-64 object-cover rounded-2xl"
                    variant="top"
                    src={packages.images[0]}
                    alt={`Image 1 of ${packages.Destination}`}
                  />
                </div>
                {packages.images.slice(1).map((image, index) => (
                  <div key={index} className="col-span-1">
                    <Card.Img
                      className="mx-auto w-full h-32 object-cover rounded-2xl"
                      variant="top"
                      src={image}
                      alt={`Image ${index + 2} of ${packages.Destination}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Card.Body className="text-center">
              <Card.Title className="text-white text-2xl">{packages.Destination}</Card.Title>
              <div className="max-w-md mx-auto">
                <h2 className="text-lg font-semibold">Plan Of The Trip</h2>
                <p className="text-black">{packages.Description}</p>
                <h3 className="text-black text-xl">₹{packages.Price}-/Day</h3>
                <h3 className="text-black text-xl">{packages.Category}</h3>
                <h3 className="text-black text-xl">{packages.Available_Date.toLocaleDateString()}</h3>
              </div>
              <div className="form mt-4 border p-2 rounded-lg" style={{ maxWidth: '300px', margin: '0 auto' }}>
                <form>
                  <input
                    type="date"
                    name="availableDate"
                    placeholder="Available Date"
                    value={formState.availableDate}
                    onChange={handleInputChange}
                    className="block w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name="days"
                    placeholder="How many days during this trip"
                    value={formState.days}
                    onChange={handleInputChange}
                    className="block w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formState.price}
                    readOnly
                    className="block w-full p-2 mb-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                  <Button className="bg-primary text-white py-2 px-4 rounded-lg">
                    Confirm your Booking
                  </Button>
                </form>
              </div>
            </Card.Body>
           </Card> 
        )}
      </div>
    </>
  );
}

export default Singlepackage;
