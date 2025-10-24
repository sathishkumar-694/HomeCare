import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from 'react-hot-toast';

export default function Feedback() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: "",
    wouldRecommend: null
  });

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const res = await axios.get(API.BOOKING.GET_BY_ID(bookingId));
      setBooking(res.data);
    } catch (err) {
      console.error("Error fetching booking details:", err);
      toast.error("Error loading booking details");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (rating) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  const handleRecommendationChange = (recommend) => {
    setFeedback(prev => ({ ...prev, wouldRecommend: recommend }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.rating || feedback.wouldRecommend === null) {
      toast.error("Please provide a rating and recommendation");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(API.FEEDBACK.CREATE(), {
        bookingId,
        userId: user._id,
        vendorId: booking.vendorId,
        rating: feedback.rating,
        comment: feedback.comment,
        wouldRecommend: feedback.wouldRecommend
      });

      toast.success("Thank you for your feedback!");
      navigate("/my-bookings");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Error submitting feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please login to provide feedback.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Booking Not Found</h1>
          <p className="text-gray-600">The booking you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            📝 Service Feedback
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Help us improve by sharing your experience
          </p>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Service</p>
                <p className="font-medium">{booking.serviceName || booking.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vendor</p>
                <p className="font-medium">{booking.vendorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium capitalize">{booking.status}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                How would you rate this service? *
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`p-2 rounded-lg transition-all ${
                      star <= feedback.rating
                        ? "text-yellow-400 bg-yellow-50"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    <Star size={32} fill={star <= feedback.rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {feedback.rating === 0 && "Please select a rating"}
                {feedback.rating === 1 && "Poor"}
                {feedback.rating === 2 && "Fair"}
                {feedback.rating === 3 && "Good"}
                {feedback.rating === 4 && "Very Good"}
                {feedback.rating === 5 && "Excellent"}
              </p>
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Would you recommend this vendor to others? *
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleRecommendationChange(true)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                    feedback.wouldRecommend === true
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  <ThumbsUp size={20} />
                  <span>Yes</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRecommendationChange(false)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-all ${
                    feedback.wouldRecommend === false
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300 hover:border-red-500"
                  }`}
                >
                  <ThumbsDown size={20} />
                  <span>No</span>
                </button>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Additional Comments (Optional)
              </label>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Tell us more about your experience..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting || feedback.rating === 0 || feedback.wouldRecommend === null}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  submitting || feedback.rating === 0 || feedback.wouldRecommend === null
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
