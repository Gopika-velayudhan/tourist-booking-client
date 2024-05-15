import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userId");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`http://localhost:3005/api/user/wishlists/${userid}`, { headers });
        setWishlist(response.data.data.map(pkg => pkg.packageid));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (pkgId) => {
    try {
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(
        `http://localhost:3005/api/user/wishlists/${userid}`,
        { packageid: pkgId },
        { headers }
      );
      if (response.status === 200) {
        setWishlist([...wishlist, pkgId]);
        toast.success("Package successfully added to wishlist");
      }
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
      if (response.status === 200) {
        setWishlist(wishlist.filter(id => id !== pkgId));
        toast.success("Package successfully removed from wishlist");
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
                className="text-xl text-red-500 absolute top-0 right-0 m-2"
                onClick={() => toggleLike(pkg._id)}
              />
            ) : (
              <AiOutlineHeart
                className="text-xl absolute top-0 right-0 m-2"
                onClick={() => toggleLike(pkg._id)}
              />
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default HoneyMoon;
