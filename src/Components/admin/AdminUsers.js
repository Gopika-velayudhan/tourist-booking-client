import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserLarge } from "react-icons/fa6";
import SideBar from "../admin/Sidebar";
import { TbLockOpen, TbLockOff } from "react-icons/tb";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(
          "http://localhost:3005/api/admin/users",
          {headers}
          
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLock = async (id, isBlocked) => {
    try {
      const token = localStorage.getItem("adminToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      console.log(headers);
      const url = isBlocked
        ? `http://localhost:3005/api/admin/users1/${id}`
        : `http://localhost:3005/api/admin/users/${id}`;
  
      const response = await axios.put(url,{}, {headers});
      
       
      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === id ? { ...item, isBlocked: !item.isBlocked } : item
        )
      );
      
      console.log(response.data.message);
    } catch (error) {
      console.error("Error locking/unlocking user:", error);
    }
  };

  return (
    <div className="flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="max-w-full mx-auto mt-8 p-6 bg-white rounded-md shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-orange-900 uppercase">
          User List
        </h2>
        {users.length === 0 ? (
          <p className="text-center bg-gray-100 py-4">No users found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  PhoneNumber
                </th>
                <th className="px-6 py-3 text-left font-medium uppercase tracking-wider">
                  Block
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {users.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FaUserLarge className="text-blue-500 w-6 h-6" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Phonenumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.isBlocked ? (
                      <TbLockOff
                        className="text-red-500 w-6 h-6 cursor-pointer"
                        onClick={() => handleLock(item._id, true)}
                      />
                    ) : (
                      <TbLockOpen
                        className="text-green-500 w-6 h-6 cursor-pointer"
                        onClick={() => handleLock(item._id, false)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
