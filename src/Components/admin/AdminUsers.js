import React, { useState, useEffect } from "react";
import axios from "axios";

import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaUserLarge } from "react-icons/fa6";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          "http://localhost:3005/api/admin/users",
          { headers }
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      {users.length <= 0 ? (
        <h1 className="text-center">No Users Found</h1>
      ) : (
        <div>
          <h1 className="text-center mb-4">User Details</h1>
          <div className="table-responsive">
            <MDBTable responsive="sm" hover bordered>
              <MDBTableHead color="primary">
                <tr>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Phonenumber</th>
                
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {users.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <FaUserLarge className="mr-2" />
                        <span className="font-weight-bold">{item.Username}</span>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.Phonenumber}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
