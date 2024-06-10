import React, { useState } from 'react';
import instance from '../../axiosinterceptor/userinterrceptor';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar } from 'react-icons/fa';

const Reviewpackage = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(""); 

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setError(""); 
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setError(""); 
  };

  const addReview = async () => {
    try {
      const userid = localStorage.getItem("_id");
      const packageid = localStorage.getItem("packageId");
      
      if (!userid || !packageid) {
        throw new Error("User ID or Package ID is missing.");
      }

      
      const hasBooked = await checkIfUserBookedPackage(userid, packageid);
      if (!hasBooked) {
        throw new Error("You can only review a package you have booked.");
      }

      const response = await instance.post("/api/review/reviews", {
        user: userid,
        package: packageid,
        rating,
        reviewText: review,
      });

      if (response.status === 201) {
        toast.success("Successfully added the review");
        setReview("");
        setRating(0);
        setError("");
      } else {
        throw new Error(response.data.message || "Failed to add review");
      }
    } catch (err) {
      setError(err.message || "Failed to add review");
      console.log(err);
    }
  };

  const checkIfUserBookedPackage = async (userid, packageid) => {
    try {
      const response = await instance.get(`/api/user/bookings/${userid}`);
      if (response.status === 200) {
        const bookings = response.data;
        const hasBooked = bookings.some((booking) => booking.package === packageid);
        return hasBooked;
      }
      return false;
    } catch (err) {
      console.error("Error checking booking status:", err);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview();
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>Submit Your Review</h2>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <div className="rating-stars">
                {[...Array(5)].map((star, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i} className="star-label">
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => handleRatingChange(ratingValue)}
                        required
                      />
                      <FaStar
                        className="star"
                        color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        size={30}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="review" className="form-label">Review</label>
              <textarea
                id="review"
                name="review"
                className="form-control"
                value={review}
                onChange={handleReviewChange}
                rows="5"
                required
                disabled={!!error}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!!error}>Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviewpackage;
