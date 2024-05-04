import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "./Sidebar";


function Adminedit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    Destination: "",
    Duration: "",
    Price: "",
    Available_Date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.put(
        `http://localhost:3005/api/admin/packages/${id}`,
        formData,
        {headers}
        
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <div className="flex">
      <div className="h-screen w-1/4 ">
        <SideBar />
      </div>
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label htmlFor="destination" className="block mb-2">
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            name="Destination"
            value={formData.Destination}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="duration" className="block mb-2">
            Duration:
          </label>
          <input
            type="text"
            id="duration"
            name="Duration"
            value={formData.Duration}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="price" className="block mb-2">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <label htmlFor="availableDate" className="block mb-2">
            Available Date:
          </label>
          <input
            type="text"
            id="availableDate"
            name="Available_Date"
            value={formData.Available_Date}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminedit;
