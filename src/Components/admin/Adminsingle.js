import axios from "axios";
import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";
import instance from "../../axiosinterceptor/Axiosinterceptor";

const Adminsingle = () => {
  const { id } = useParams();
  const [packag, setPackage] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        // const token = localStorage.getItem("adminToken");
        // const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await instance.get(`/packages/${id}`)
          
          
        

        response.data.data.Available_Date = new Date(
          response.data.data.Available_Date
        );
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
          <div
            key={packag._id}
            className="bg-white rounded-lg shadow-md p-6 max-w-xl w-full"
          >
            <h3 className="text-3xl font-bold mb-4 text-black">
              {packag.Destination}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                {packag.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1} of ${packag.Destination}`}
                    className="w-auto h-auto max-h-64 rounded-md shadow-md"
                  />
                ))}
              </div>
            </div>
            <div className="">
              <div className="mt-4">
                <h4 className="text-lg font-bold">Description:</h4>
                <p className="text-sm">{packag.Description}</p>
              </div>
            </div>
            <div className="">
              <div className="mt-4">
                <h4 className="text-lg font-bold">Category:</h4>
                <p className="text-semibold">{packag.Category}</p>
              </div>
            </div>
            <div className="">
              <div className="mt-4">
                <h4 className="text-lg font-bold">Available_Date:</h4>

                <p className="text-semibold">
                  {packag.Available_Date.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminsingle;
