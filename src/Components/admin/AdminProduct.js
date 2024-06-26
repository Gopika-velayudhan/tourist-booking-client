import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import instance from "../../axiosinterceptor/Axiosinterceptor";
import { FadeLoader } from 'react-spinners';
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const [formData, setFormData] = useState({
    Destination: "",
    Duration: "",
    Category: "",
    Price: "",
    Available_Date: "",
    images: [],
    Description: "",
  });
  const [loading, setLoading] = useState(false);
  const [Category, setCategory] = useState([]);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "images") {
      const files = e.target.files;
      const imagesArray = [];
      for (let i = 0; i < files.length; i++) {
        imagesArray.push(files[i]);
      }
      setFormData((prevData) => ({
        ...prevData,
        images: imagesArray,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Destination", formData.Destination);
      formDataToSend.append("Duration", formData.Duration);
      formDataToSend.append("Category", formData.Category);
      formDataToSend.append("Price", formData.Price);
      formDataToSend.append("Available_Date", formData.Available_Date);
      for (let i = 0; i < formData.images.length; i++) {
        formDataToSend.append("images", formData.images[i]);
      }
      formDataToSend.append("Description", formData.Description);

      const response = await instance.post("/api/admin/packages", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/adminview")
      

        
        
        localStorage.setItem('packageId', response.data.packageId);

        setFormData({
          Destination: "",
          Duration: "",
          Category: "",
          Price: "",
          Available_Date: "",
          images: [],
          Description: "",
        });
      } else {
        toast.error(response.data.message || "Error submitting form.");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Check your authentication credentials.");
      } else {
        toast.error("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  useEffect(() => {
    const handleGet = async () => {
      try {
        const response = await instance.get("/api/admin/categories");
        setCategory(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    handleGet();
  }, []);

  return (
    <div className="container-md mt-5 d-flex" style={{ maxWidth: "600px", margin: "auto" }}>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Add a Product</h2>
        </div>
        <div className="card-body" style={{ padding: "20px" }}>
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
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="Duration" className="form-label">
                  <i className="fas fa-clock" /> Duration:
                </label>
                <input
                  type="number"
                  id="Duration"
                  className="form-control"
                  value={formData.Duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="Category" className="form-label">
                  <i className="fas fa-list" /> Category:
                </label>
                <select
                  id="Category"
                  className="form-control"
                  value={formData.Category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {Category.map((item) => (
                    <option key={item._id} value={item.category}>{item.category}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="Price" className="form-label">
                  <FontAwesomeIcon icon={faDollarSign} /> Price:
                </label>
                <input
                  type="number"
                  id="Price"
                  className="form-control"
                  value={formData.Price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="Available_Date" className="form-label">
                  Available Date:
                </label>
                <input
                  type="date"
                  id="Available_Date"
                  className="form-control"
                  min={getCurrentDate()}
                  value={formData.Available_Date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="images" className="form-label">
                  Image:
                </label>
                <input
                  type="file"
                  id="images"
                  className="form-control"
                  onChange={handleChange}
                  required
                  multiple
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description:
              </label>
              <textarea
                id="Description"
                className="form-control"
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>

            {loading ? (
              <div className="d-flex justify-content-center">
                <FadeLoader color="#007bff" loading={loading} size={15} />
              </div>
            ) : (
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
