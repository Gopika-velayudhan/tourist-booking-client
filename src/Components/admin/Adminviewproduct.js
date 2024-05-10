import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


function Adminviewproduct() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          "http://localhost:3005/api/admin/packages",
          {headers}
        );
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const confirmed = window.confirm("Are you sure delete the package");

      if (confirmed) {
        const response = await axios.delete(
          `http://localhost:3005/api/admin/packages/${_id}`,
          {headers}
          
        );

        if (response.status === 200) {
          const updatedPackages = packages.filter((item) => item._id !== _id);
          setPackages(updatedPackages);
          console.log(response.data.message);
          toast.success("Successfully deleted package");
        } else {
          console.log("Failed to delete package");
          toast.error("Oops! Something went wrong.");
        }
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="flex">
      <div className="h-screen w-1/4">
        <SideBar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8">Package List</h1>
        <div className="grid grid-cols-3 gap-6">
          {packages.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
             
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {item.Destination}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {item.Duration} Days
                </p>
                
                  <img
                  
                    src={item.images[1]}
                  
                    className="w-full h-auto mb-4"
                    onClick={() => navigate(`/adminsingle/${item._id}`)}
                  />
              
                <p className="text-sm text-gray-500 font-semibold mb-4">
                  {item.Price}
                </p>
              </div>
              <div className="flex justify-between items-center p-4">
                <FaEdit
                  size={24}
                  className="text-black-500 cursor-pointer"
                  onClick={() => navigate(`/adminedit/${item._id}`)}
                />
                <MdDelete
                  size={24}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Adminviewproduct;
