import instance from "../../axiosinterceptor/userinterrceptor";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("_id");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await instance.get(`/api/user/wishlists/${userid}`, { headers });

        response.data.data.forEach((item) => {
          item.Available_Date = new Date(item.Available_Date);
        });
        setWishlist(response.data.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        toast.error("Error fetching wishlist");
      }
    };

    fetchWishlist();
  }, []);

  const handledelete = async (pkgId) => {
    try {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("_id");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await instance.delete(`/api/user/wishlists/${userid}`, {
        headers,
        data: { packageid: pkgId },
      });

      if (response.status === 200) {
        toast.success("Successfully removed the wishlist item");

        setWishlist(wishlist.filter((item) => item._id !== pkgId));
      }
    } catch (err) {
      console.error("Error deleting wishlist item:", err);
      toast.error("Error deleting wishlist item");
    }
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">
        My Dream World Wishlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-bold mb-2">{item.Destination}</h3>
              <img
                src={item.images[0]}
                alt={item.Destination}
                className="w-full h-48 object-cover border border-gray-200 shadow-sm mb-4"
              />
              <p className="mt-2 text-sm sm:text-base">Duration: {item.Duration} days</p>
              <p className="text-sm sm:text-base">Available Date: {item.Available_Date.toDateString()}</p>
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => navigate(`/singlepack/${item._id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Your Dream
                </Button>
                <Button
                  onClick={() => handledelete(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove Wishlist
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
