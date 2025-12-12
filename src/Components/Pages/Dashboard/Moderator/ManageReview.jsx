import axios from "axios";
import React, { useState } from "react";
import { FaTrash, FaInfoCircle } from "react-icons/fa";

const ManageReview = () => {

  const [list, setList] = useState([]);

  axios.get('/JSONS/Reviews.json')
  .then( res => setList(res.data))

  
  const [detailsModal, setDetailsModal] = useState(null);


  const deleteReview = (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    setList((prev) => {
      const next = prev.filter((p) => p.id !== id);
      return next;
    });
  };

  const openDetails = (r) => setDetailsModal(r);
  const closeDetails = () => setDetailsModal(null);

  return (
    <div className="w-full max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">All Reviews</h3>
        <div className="flex items-center gap-3 w-full md:w-auto">
          
          
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="">
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
                    <td
                      colSpan={6}
                      className="text-center text-sm text-base-content/60 py-6"
                    >
                      No reviews found
                    </td>
                  </tr>
                )}
                {list.map((r) => (
                  <tr key={r.id}>
                    <td className="min-w-0">
                      <div className="font-medium text-pink-600">{r.studentName}</div>
                      <div className="text-sm text-base-content/60">{r.studentEmail}</div>
                    </td>
                    <td className="min-w-0">
                      <div className="font-medium">{r.scholarshipName}</div>
                      <div className="text-sm text-base-content/60">{r.university}</div>
                    </td>
                    <td>
                      <div className="inline-flex items-center gap-2">
                        <div className="text-sm font-semibold text-green-600">{r.rating}</div>
                        <div className="text-xs text-base-content/60">/5</div>
                      </div>
                    </td>
                    <td className="max-w-xl">
                      <div className="text-sm text-base-content/80 line-clamp-2">{r.review}</div>
                    </td>
                    <td className="whitespace-nowrap">{r.postedOn}</td>
                    <td className="text-right">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => openDetails(r)}
                          className="btn btn-sm bg-base-200 text-black/80 hover:bg-base-300 flex items-center gap-2"
                          aria-label="View details"
                        >
                          <FaInfoCircle /> <span className="hidden lg:inline">Details</span>
                        </button>
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="btn btn-sm bg-red-400 text-white hover:bg-red-500 flex items-center gap-2"
                          aria-label="Delete review"
                        >
                          <FaTrash /> <span className="hidden lg:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-3 mt-4">
        {list.length === 0 && (
          <div className="text-sm text-base-content/60">No reviews found</div>
        )}
        {list.map((r) => (
          <div key={r.id} className="p-3 rounded-lg bg-base-200 border border-base-300">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-pink-600">{r.studentName}</div>
                <div className="text-sm text-base-content/70 truncate">{r.studentEmail}</div>
                <div className="text-sm mt-1 truncate">{r.scholarshipName} <br /> • {r.university}</div>
                <div className="text-sm mt-2 line-clamp-2">{r.review}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold text-green-600">{r.rating}/5</div>
                <div className="text-xs text-base-content/50 mt-2">{r.postedOn}</div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => openDetails(r)}
                className="px-3 py-1 rounded bg-base-200 text-sm flex items-center gap-2"
              >
                <FaInfoCircle /> Details
              </button>
              <button
                onClick={() => deleteReview(r.id)}
                className="px-3 py-1 rounded bg-red-400 text-white text-sm flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {detailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeDetails} />
          <div className="relative w-full max-w-md md:max-w-2xl bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-3">Review Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-base-content/70">Student</div>
                <div className="font-medium">{detailsModal.studentName}</div>
                <div className="text-sm">{detailsModal.studentEmail}</div>
                <div className="text-sm mt-2 text-base-content/70">Posted On: {detailsModal.postedOn}</div>
              </div>
              <div>
                <div className="text-sm text-base-content/70">Scholarship</div>
                <div className="font-medium">{detailsModal.scholarshipName}</div>
                <div className="text-sm">{detailsModal.university}</div>
                <div className="text-sm mt-2 text-base-content/70">Rating: <span className="font-semibold text-green-600">{detailsModal.rating}/5</span></div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-base-content/70">Full Review</div>
                <div className="mt-2 text-sm">{detailsModal.review}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeDetails} className="px-3 py-2 rounded bg-base-200">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReview;
