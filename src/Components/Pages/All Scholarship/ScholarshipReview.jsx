import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axiosProvider from "../../../API/axiosProvider";
import Loader from "../Loader/Loader";

const ScholarshipReview = ({id}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosProvider
      .get(`/reviews/scholarship/${id}`)
      .then((res) => setReviews(res.data || []))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-16">
      <div className="bg-base-100 rounded-xl p-6 shadow">
        <h3 className="text-2xl font-semibold mb-6">
          Student <span className="text-green-600">Reviews</span>
        </h3>

        {reviews.length === 0 && (
          <p className="text-sm text-gray-500">
            No reviews yet for this scholarship.
          </p>
        )}

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex gap-4 p-4 rounded-xl bg-base-200 border border-green-600"
            >

              <img
                src={review.userImage}
                alt={review.userName}
                className="w-14 h-14 rounded-full object-cover border"
              />

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-semibold text-gray-800">
                    {review.userName}
                  </h4>

                  <span className="text-xs text-gray-500">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </span>
                </div>


                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= review.ratingPoint
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>


                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  {review.reviewComment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipReview;
