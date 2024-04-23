import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AdminProduct = () => {
  const [formData, setFormData] = useState({
    Destination: '',
    Duration:'',
    Category: '',
    Price: '',
    Available_Date: '',
    Image: '',
    Description: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminToken = localStorage.getItem('adminToken');
      console.log(adminToken);
  
      if (!adminToken) {
        toast.error('Admin token not found.');
        return;
      }
  
      const response = await axios.post(
        'http://localhost:3005/api/admin/Package',
        formData,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        toast.success(response.data.message);
      
        setFormData({
          Destination: '',
          Duration: 0,
          Category: '',
          Price: 0,
          Available_Date: '',
          image: '',
          Description: '',
        });
      } else {
        toast.error(response.data.message || 'Error submitting form.');
      }
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response && error.response.status === 401) {
        toast.error('Unauthorized. Check your authentication credentials.');
      } else {
        toast.error('An error occurred.');
      }
    }
  };
  
  
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add a Product</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
        
        
            <div className="mb-3">
              <label htmlFor="Destination" className="form-label">
                Destination:
              </label>
              <input
                type="text"
                id="Destination"
                className="form-control"
                value={formData.Destination}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Duration" className="form-label">
                Duration:
              </label>
              <input type="number" id="Duration"  className="form-control" value={formData.Duration} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="Category" className="form-label">
                Category:
              </label>
              <input type="text" id="Category"  className="form-control" value={formData.Category} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price:
              </label>
              <input type="number" id="Price" className="form-control" value={formData.Price} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="Available_Date" className="form-label">
                Available_Date:
              </label>
              <input type="date" id="Available_Date"  className="form-control" value={formData.Available_Date} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="Image url" className="form-label">
                image url:
              </label>
              <input type="text" id="image" className="form-control" value={formData.image} onChange={handleChange}required />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description:
              </label>
              <input type="text" id="Description" className="form-control" value={formData.Description} onChange={handleChange} required />
            </div>


            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;



