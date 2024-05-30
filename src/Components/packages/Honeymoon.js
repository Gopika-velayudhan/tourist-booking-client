import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import instance from "../../axiosinterceptor/userinterrceptor";
import "./HoneyMoon.css";
import "tailwindcss/tailwind.css";
import { toast } from "react-toastify";

const HoneyMoon = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await instance.get("/packages", {
          params: { Category: "Honeymoon" },
        });
        setPackages(response.data.data);
        setLoading(false);
        console.log("Fetched data:", response.data.data);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const addToWishlist = async (pkgId) => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("_id");

    if (!token) {
      toast.error("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    try {
      const response = await instance.post(`/wishlists/${userid}`, {
        packageid: pkgId,
      });
      if (response.status === 200) {
        toast.success("Package successfully added to wishlist");
        setWishlist((prevWishlist) => [...prevWishlist, pkgId]);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const deleteFromWishlist = async (pkgId) => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("_id");

    if (!token) {
      toast.error("Please login to remove from wishlist");
      navigate("/login");
      return;
    }

    try {
      const response = await instance.delete(`/wishlists/${userid}`, {
        data: { packageid: pkgId },
      });
      if (response.status === 200) {
        toast.success("Package successfully removed from wishlist");
        setWishlist((prevWishlist) =>
          prevWishlist.filter((id) => id !== pkgId)
        );
      }
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
    }
  };

  const toggleLike = (pkgId) => {
    if (isLiked(pkgId)) {
      deleteFromWishlist(pkgId);
    } else {
      addToWishlist(pkgId);
    }
  };

  const isLiked = (pkgId) => wishlist.includes(pkgId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || packages.length === 0) {
    return <p>No packages found for the specified category.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {packages.map((pkg, index) => (
        <Card key={index} className="relative w-full h-100">
          <Card.Img
            variant="top"
            src={pkg.images[0]}
            alt={pkg.Destination}
            className="object-cover h-40"
          />
          <Card.Body>
            <div className="flex justify-center items-center">
              <Card.Title>{pkg.Destination}</Card.Title>
              {isLiked(pkg._id) ? (
                <AiFillHeart
                  className="text-xl text-red-500 cursor-pointer"
                  onClick={() => toggleLike(pkg._id)}
                />
              ) : (
                <AiOutlineHeart
                  className="text-xl cursor-pointer"
                  onClick={() => toggleLike(pkg._id)}
                />
              )}
            </div>
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
      ))}
    </div>
  );
};

export default HoneyMoon;
