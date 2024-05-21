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
      const token = localStorage.getItem("token");
      const userid = localStorage.getItem("userId");

      if (token && userid) {
        try {
          const headers = { Authorization: `Bearer ${token}` };
          const response = await axios.get(`http://localhost:3005/api/user/wishlists/${userid}`, {
            headers,
          });
          setWishlist(response.data.wishlist || []);
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      }
    };

    fetchWishlist();
  }, []);

  const addToWishlist = async (pkgId) => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userId");

    if (!token) {
      toast.error("please login");
      navigate("/login");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `http://localhost:3005/api/user/wishlists/${userid}`,
        { packageid: pkgId },
        { headers }
      );
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
    const userid = localStorage.getItem("userId");

    if (!token) {
      toast.error("Please log in to remove packages from your wishlist.");
      navigate("/login");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(
        `http://localhost:3005/api/user/wishlists/${userid}`,
        {
          headers,
          data: { packageid: pkgId },
        }
      );
      if (response.status === 200) {
        toast.success("Package successfully removed from wishlist");
        setWishlist((prevWishlist) => prevWishlist.filter(id => id !== pkgId));
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
                className="text-xl text-red-500 absolute top-0 right-0 m-2 cursor-pointer"
                onClick={() => toggleLike(pkg._id)}
              />
            ) : (
              <AiOutlineHeart
                className="text-xl absolute top-0 right-0 m-2 cursor-pointer"
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
