import axios from "axios";
import React, { useState, useEffect } from "react";
import SideBar from "./Sidebar";
import { useParams } from "react-router-dom";

const Adminsingle = () => {
  const { id } = useParams();
  const [packag, setPackage] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          `http://localhost:3005/api/admin/packages/${id}`,
          { headers }
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
            className="bg-white rounded-lg shadow-md p-6 max-w-sm"
          >
            <h3 className="text-lg font-semibold mb-2">{packag.Destination}</h3>
            <p className="text-sm text-gray-500 mb-4">{packag.Duration} Days</p>
            <img
              src={packag.image}
              alt={packag.Destination}
              className="w-full h-auto mb-4"
            />
            <p className="text-sm text-gray-500 font-semibold mb-4">
              {packag.Price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminsingle;
