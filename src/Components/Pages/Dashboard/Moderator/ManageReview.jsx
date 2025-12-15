
import React, { useEffect, useState } from "react";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import axiosProvider from "../../../../API/axiosProvider";

const ManageReview = () => {
  const [list, setList] = useState([]);
  const [detailsModal, setDetailsModal] = useState(null);

  useEffect(() => {
    axiosProvider.get("/reviews").then((res) => {
      const mapped = res.data.map((r) => ({
        _id: r._id,
        studentName: r.userName,
        studentEmail: r.userEmail,
        scholarshipName: r.scholarshipName,
        university: `${r.universityName}, ${r.universityCountry}`,
        rating: r.ratingPoint,
        review: r.reviewComment,
        postedOn: new Date(r.reviewDate).toLocaleDateString(),
      }));

      setList(mapped);
    });
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;

    await axiosProvider.delete(`/reviews/${id}`);
    setList((prev) => prev.filter((p) => p._id !== id));
  };

  const openDetails = (r) => setDetailsModal(r);
  const closeDetails = () => setDetailsModal(null);

  return (
    <div className="w-full max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">All Reviews</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="hidden lg:block">
          <table className="table mx-auto xl:w-full">
            <thead>
              <tr>
                <th>Student</th>
                <th>Scholarship / University</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Posted</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-sm py-6">
                    No reviews found
                  </td>
                </tr>
              )}

              {list.map((r) => (
                <tr key={r._id}>
                  <td>
                    <div className="font-medium text-pink-600">
                      {r.studentName}
                    </div>
                    <div className="text-sm">{r.studentEmail}</div>
                  </td>

                  <td>
                    <div className="font-medium">{r.scholarshipName}</div>
                    <div className="text-sm">{r.university}</div>
                  </td>

                  <td>
                    <span className="font-semibold text-green-600">
                      {r.rating}/5
                    </span>
                  </td>

                  <td className="max-w-md">
                    <div className="text-sm line-clamp-2">{r.review}</div>
                  </td>

                  <td>{r.postedOn}</td>

                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openDetails(r)}
                        className="btn btn-sm bg-base-200">
                        <FaInfoCircle /> Details
                      </button>

                      <button
                        onClick={() => deleteReview(r._id)}
                        className="btn btn-sm bg-red-400 text-white">
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-3 mt-4">
        {list.map((r) => (
          <div key={r._id} className="p-3 rounded-lg bg-base-200">
            <div className="font-medium text-pink-600">{r.studentName}</div>
            <div className="text-sm">{r.studentEmail}</div>
            <div className="text-sm mt-1">
              {r.scholarshipName} • {r.university}
            </div>
            <div className="text-sm mt-2 line-clamp-2">{r.review}</div>

            <div className="flex justify-between mt-2">
              <span className="text-green-600 font-semibold">{r.rating}/5</span>
              <span className="text-xs">{r.postedOn}</span>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => openDetails(r)}
                className="btn btn-sm bg-base-200">
                <FaInfoCircle /> Details
              </button>

              <button
                onClick={() => deleteReview(r._id)}
                className="btn btn-sm bg-red-400 text-white">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {detailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDetails}
          />
          <div className="relative w-full max-w-md bg-base-100 p-4 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-3">Review Details</h4>

            <p className="font-medium">{detailsModal.studentName}</p>
            <p className="text-sm">{detailsModal.studentEmail}</p>

            <p className="mt-2 font-medium">{detailsModal.scholarshipName}</p>
            <p className="text-sm">{detailsModal.university}</p>

            <p className="mt-2">
              Rating:{" "}
              <span className="text-green-600 font-semibold">
                {detailsModal.rating}/5
              </span>
            </p>

            <p className="mt-2  text-sm">{detailsModal.review}</p>

            <div className="mt-4 text-right">
              <button onClick={closeDetails} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReview;
