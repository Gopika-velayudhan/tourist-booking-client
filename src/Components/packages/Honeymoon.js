import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; 
import "./HoneyMoon.css";
import "tailwindcss/tailwind.css";

const HoneyMoon = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [likedPackages, setLikedPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get("http://localhost:3005/api/user/packages", {
          params: { Category: "Honeymoon" },
          headers: headers,
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
    try {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(
        `http://localhost:3005/api/user/wishlists/${userid}`,
        {
          packageid: pkgId,
        },
        { headers }
      );
      console.log("Added to wishlist:", response.data);
      setWishlist([...wishlist, pkgId]);
      toggleLike(pkgId);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const deleteFromWishlist = async (pkgId) => {
    try {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.delete(
        `http://localhost:3005/api/user/wishlists/${userid}`,
        {
          headers,
          data: { packageid: pkgId },
        }
      );
      console.log("Deleted from wishlist:", response.data);
      setWishlist(wishlist.filter((id) => id !== pkgId));
      toggleLike(pkgId);
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
    }
  };

  const toggleLike = (pkgId) => {
    if (likedPackages.includes(pkgId)) {
      setLikedPackages(likedPackages.filter((id) => id !== pkgId));
    } else {
      setLikedPackages([...likedPackages, pkgId]);
    }
  };

  const isInWishlist = (pkgId) => wishlist.includes(pkgId);
  const isLiked = (pkgId) => likedPackages.includes(pkgId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || packages.length === 0) {
    return <p>No packages found for the specified category.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 p-4">
      {packages.map((pkg, index) => (
        <Card key={index} className="relative w-64 h-100">
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
            <Button variant="primary" onClick={() => navigate(`/singlepack/${pkg._id}`)}>
              View Dreams
            </Button>

            {isLiked(pkg._id) ? (
              <AiFillHeart
                className="text-xl text-red-500 absolute top-0 right- 0 m-2"
                onClick={() => {
                  deleteFromWishlist(pkg._id);
                  toggleLike(pkg._id);
                }}
              />
            ) : (
              <AiOutlineHeart
                className="text-xl absolute top-0 right-0 m-2"
                onClick={() => {
                  addToWishlist(pkg._id);
                  toggleLike(pkg._id);
                }}
              />
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default HoneyMoon;
