import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../axiosinterceptor/Axiosinterceptor";
import SideBar from "./Sidebar";

function Adminedit() {
  const { id } = useParams();
  const [Category, setCategory] = useState([]);

  const formik = useFormik({
    initialValues: {
      Destination: "",
      Duration: "",
      Category: "",
      Available_Date: "",
      Price: "",
    },
    validationSchema: Yup.object({
      Destination: Yup.string().required("Destination is required"),
      Duration: Yup.string().required("Duration is required"),
      Category: Yup.string().required("Category is required"),
      Available_Date: Yup.date().required("Available Date is required"),
      Price: Yup.string().required("Price is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await instance.put(
          `/api/admin/packages/${id}`,
          values
        );
        toast.success("Updated successfully");
      } catch (error) {
        console.error("Error updating package:", error);
        toast.error("Failed to update package.");
      }
    },
  });
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await instance.get("/api/admin/categories");
        setCategory(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchcategory();
  }, []);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await instance.get(`/api/admin/packages/${id}`);
        const packageData = response.data.data;
        formik.setValues({
          Destination: packageData.Destination || "",
          Duration: packageData.Duration || "",
          Category: packageData.Category || "",
          Available_Date: packageData.Available_Date
            ? packageData.Available_Date.split("T")[0]
            : "",
          Price: packageData.Price || "",
        });
      } catch (error) {
        console.error("Error fetching package:", error);
        toast.error("Failed to fetch package details.");
      }
    };

    fetchPackage();
  }, [id]);

  return (
    <div className="flex">
      <div className="h-screen w-1/4">
        <SideBar />
      </div>
      <div className="flex-1 p-6">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <label htmlFor="destination" className="block mb-2">
            Destination:
          </label>
          <input
            type="text"
            id="destination"
            name="Destination"
            value={formik.values.Destination}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {formik.touched.Destination && formik.errors.Destination ? (
            <div className="text-red-500">{formik.errors.Destination}</div>
          ) : null}

          <label htmlFor="duration" className="block mb-2">
            Duration:
          </label>
          <input
            type="text"
            id="duration"
            name="Duration"
            value={formik.values.Duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {formik.touched.Duration && formik.errors.Duration ? (
            <div className="text-red-500">{formik.errors.Duration}</div>
          ) : null}

          <label htmlFor="category" className="block mb-2">
            Category:
          </label>
          <select
            id="category"
            name="Category"
            value={formik.values.Category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {Category.map((item) => (
              <option key={item._id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
          {formik.touched.Category && formik.errors.Category ? (
            <div className="text-red-500">{formik.errors.Category}</div>
          ) : null}

          <label htmlFor="price" className="block mb-2">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="Price"
            value={formik.values.Price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {formik.touched.Price && formik.errors.Price ? (
            <div className="text-red-500">{formik.errors.Price}</div>
          ) : null}

          <label htmlFor="availableDate" className="block mb-2">
            Available Date:
          </label>
          <input
            type="date"
            id="availableDate"
            name="Available_Date"
            value={formik.values.Available_Date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {formik.touched.Available_Date && formik.errors.Available_Date ? (
            <div className="text-red-500">{formik.errors.Available_Date}</div>
          ) : null}

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
