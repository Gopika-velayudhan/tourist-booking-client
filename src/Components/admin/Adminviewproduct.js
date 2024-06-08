import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../axiosinterceptor/Axiosinterceptor";
import "./Adminviewproduct.css";

function Adminviewproduct() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await instance.get("/api/admin/packages");
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const confirmed = window.confirm("Are you sure to delete the package?");
      if (confirmed) {
        const response = await instance.delete(`/api/admin/packages/${_id}`);
        if (response.status === 200) {
          setPackages(packages.filter((item) => item._id !== _id));
          toast.success("Successfully deleted package");
        } else {
          toast.error("Oops! Something went wrong.");
        }
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="admin-view-product-container">
      <div className="sidebar-container">
        <SideBar />
      </div>
      <div className="content-container">
        <h1 className="text-3xl font-bold mb-8">Package List</h1>
        <div className="packages-grid">
          {packages.map((item) => (
            <div key={item._id} className="package-card">
              <div className="card-header">
                <h3 className="destination">{item.Destination}</h3>
                <p className="duration">{item.Duration} Days</p>
              </div>
              <div className="card-body">
                <img
                  src={item.images[1]}
                  alt={item.Destination}
                  className="package-image"
                  onClick={() => navigate(`/adminsingle/${item._id}`)}
                />
                <p className="price">₹{item.Price}</p>
              </div>
              <div className="card-footer">
                <FaEdit
                  size={24}
                  className="edit-icon"
                  onClick={() => navigate(`/adminedit/${item._id}`)}
                />
                <MdDelete
                  size={24}
                  className="delete-icon"
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
