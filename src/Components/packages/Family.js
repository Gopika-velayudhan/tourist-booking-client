
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import instance from "../../axiosinterceptor/userinterrceptor";
import "./HoneyMoon.css";
import "tailwindcss/tailwind.css";
import { toast } from "react-toastify";

const Family = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await instance.get("/packages", {
          params: { Category: "Family" },
        });
        setPackages(response.data.data);
        console.log("Fetched data:", response.data.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlistToggle = async (packageId) => {
    try {
      const userid = localStorage.getItem("_id");

      if (wishlist.includes(packageId)) {
        const response = await instance.delete(`/wishlists/${userid}`, {
          data: { packageid: packageId },
        });

        if (response.data.status === "success") {
          console.log("Package removed from wishlist:", packageId);
          const updatedWishlist = wishlist.filter((item) => item !== packageId);
          setWishlist(updatedWishlist);
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          toast.success(response.data.message);
        } else {
          toast.error("Failed to remove package from wishlist.");
        }
      } else {
        const response = await instance.post(`/wishlists/${userid}`, { packageid: packageId });

        if (response.data.status === "Success") {
          console.log("Package added to wishlist:", packageId);
          const updatedWishlist = [...wishlist, packageId];
          setWishlist(updatedWishlist);
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          toast.success(response.data.message);
        } else {
          toast.error("Failed to add package to wishlist.");
        }
      }
    } catch (error) {
      toast.error("Failed to update wishlist.");
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-details">
              <div className="skeleton-text" style={{ width: '60%' }}></div>
              <div className="skeleton-text" style={{ width: '40%' }}></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))
      ) : (
        packages.map((pkg, index) => (
          <Card key={index} className="relative w-full h-100">
            <div className="flex justify-between items-center absolute top-2 right-2 z-10">
              {wishlist.includes(pkg._id) ? (
                <AiFillHeart
                  className="text-3xl text-black-500 cursor-pointer"
                  onClick={() => handleWishlistToggle(pkg._id)}
                />
              ) : (
                <AiOutlineHeart
                  className="text-3xl text-black-500 cursor-pointer"
                  onClick={() => handleWishlistToggle(pkg._id)}
                />
              )}
            </div>
            <Card.Img
              variant="top"
              src={pkg.images[0]}
              alt={pkg.Destination}
              className="object-cover h-40"
            />
            <Card.Body>
              <Card.Title>{pkg.Destination}</Card.Title>
              <Card.Text>
                <p>Price: ${pkg.Price}</p>
                <p>Duration: {pkg.Duration} days</p>
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => navigate(`/singlepack/${pkg._id}`)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default Family;
