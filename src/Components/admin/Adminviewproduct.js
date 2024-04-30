import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
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
          { headers }
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
      const response = await axios.delete(
        `http://localhost:3005/api/admin/packages/${_id}`,
        { headers }
      );

      if (response.status === 200) {
        const updatedPackages = packages.filter((item) => item._id !== _id);
        setPackages(updatedPackages);
        console.log(response.data.message);
        toast.success("successfully deleted package");
      } else {
        console.log("Failed to delete package");
        toast.error("ho");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="d-flex ">
      <div>
        <SideBar />
      </div>
      <div>
        <section className="navu h-100" style={{ backgroundColor: "#f8f9fa" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBTypography tag="h3" className="fw-bold mb-0 text-black">
                    Package List
                  </MDBTypography>
                  <div>
                    <a href="#!" className="text-danger"></a>
                  </div>
                </div>

                {packages.map((item) => (
                  <MDBCard key={item._id} className="rounded-3 mb-4 shadow">
                    <MDBCardBody className="p-4">
                      <MDBRow className="align-items-center">
                        <MDBCol md="2">
                          <MDBCardImage
                            className="rounded-3"
                            fluid
                            src={item.image}
                            alt="products"
                          />
                        </MDBCol>
                        <MDBCol md="3">
                          <p className="lead fw-medium mb-2">
                            {item.Destination}
                          </p>
                          <p className="lead text-muted">
                            {item.Duration} Days
                          </p>
                        </MDBCol>
                        <div className="d-flex justify-content-end align-item-center">
                          <MDBCol
                            md="1"
                            className="d-flex text-end"
                            lg="1"
                            xl="1"
                          >
                            <FaEdit
                              size={24}
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`/adminedit/${item._id}`)}
                            />
                          </MDBCol>
                          <MDBCol
                            md="1"
                            className="d-flex text-end text-danger"
                            lg="1"
                            xl="1"
                          >
                            <MdDelete
                              size={24}
                              onClick={() => handleDelete(item._id)}
                              style={{ cursor: "pointer" }}
                            />
                          </MDBCol>
                        </div>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
  );
}

export default Adminviewproduct;
