import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { FaUserLarge } from "react-icons/fa6";
import { useState, useEffect } from "react";
import SideBar from "./Sidebar"; 
import axios from "axios";

const Adminusers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/admin/Users"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <SideBar />
        {users.length <= 0 ? (
          <h1>No User Found</h1>
        ) : (
          <div className="d-flex">
            <div className="w-50">
              <h1>User Details</h1>
              <div className="table-responsive">
                <MDBTable responsive="sm" striped bordered>
                  <MDBTableHead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Username</th>
                      <th scope="col">E-Mail</th>
                      <th scope="col">Phonenumber</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {users.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <FaUserLarge />
                          </div>
                        </td>
                        <td>{item.Username}</td>
                        <td>{item.email}</td>
                        <td>{item.Phonenumber}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Adminusers;
