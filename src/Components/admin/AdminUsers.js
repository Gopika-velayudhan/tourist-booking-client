import React, { useState, useEffect } from "react";
import instance from "../../axiosinterceptor/Axiosinterceptor";

import SideBar from "../admin/Sidebar";
import { TbLockOpen, TbLockOff } from "react-icons/tb";
import { toast } from "react-toastify";
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("/api/admin/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLock = async (id, isBlocked) => {
    try {
      const action = isBlocked ? "unblock" : "block";
      const url = `/api/admin/users/${id}?action=${action}`;
      const response = await instance.patch(url, {});
      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === id ? { ...item, isBlocked: !item.isBlocked } : item
        )
      );
      toast.success(response.data.message);
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
                  <td className="px-6 py-4 whitespace-nowrap" data-label="Profile">
                    <img
                      src={item.Profileimg}
                      alt="Profile"
                      className="w-7 h-7 rounded-md" 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-label="Username">
                    {item.Username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-label="Email">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-label="PhoneNumber">
                    {item.Phonenumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" data-label="Block">
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
