import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userId');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(`http://localhost:3005/api/user/wishlists/${userid}`, { headers });
        response.data.data.Available_Date = new Date(response.data.data.Available_Date);
        setWishlist(response.data.data);
        
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        toast.error("Error fetching wishlist");
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Dream World Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((item, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{item.Destination}</h3>
              <img src={item.images[0]} alt={item.Destination} className="w-full h-48 object-cover border border-gray-200 shadow-sm" /> 
              <p className="mt-2">Duration: {item.Duration}</p>
              <p>Available Date: {item.Available_Date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
