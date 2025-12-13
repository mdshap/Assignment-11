import React, { useState } from "react";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";

const MyReviews = ({ initial = [], onChange = () => {} }) => {
  const dummy =
    initial && initial.length
      ? initial
      : [
          {
            id: "r1",
            scholarshipName: "Global Excellence Scholarship",
            university: "Harvard University",
            comment:
              "Amazing opportunity — helped me cover full tuition. Highly recommended!",
            date: "2025-02-10",
            rating: 5,
          },
          {
            id: "r2",
            scholarshipName: "International Merit Award",
            university: "University of Toronto",
            comment:
              "Good support, application process was smooth, but response time could be faster.",
            date: "2025-01-22",
            rating: 4,
          },
          {
            id: "r3",
            scholarshipName: "Asian Scholars Grant",
            university: "University of Tokyo",
            comment:
              "Helpful but paperwork was heavy. Would recommend preparing early.",
            date: "2025-03-05",
            rating: 3,
          },
        ];

  const [list, setList] = useState(dummy);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(null); // review object
  const [draftComment, setDraftComment] = useState("");
  const [draftRating, setDraftRating] = useState(0);

  const visible = list.filter((r) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (r.scholarshipName || "").toLowerCase().includes(q) ||
      (r.university || "").toLowerCase().includes(q) ||
      (r.comment || "").toLowerCase().includes(q)
    );
  });

  const openEdit = (r) => {
    setEditModal({ ...r });
    setDraftComment(r.comment || "");
    setDraftRating(r.rating || 0);
  };
  const closeEdit = () => {
    setEditModal(null);
    setDraftComment("");
    setDraftRating(0);
  };

  const saveEdit = () => {
    if (!editModal) return;
    const updated = {
      ...editModal,
      comment: draftComment,
      rating: draftRating,
      date: new Date().toISOString().slice(0, 10),
    };
    setList((prev) => {
      const next = prev.map((p) => (p.id === updated.id ? updated : p));
      onChange(next);
      return next;
    });
    closeEdit();
  };

  const deleteReview = (id) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    setList((prev) => {
      const next = prev.filter((p) => p.id !== id);
      onChange(next);
      return next;
    });
  };

  const renderStars = (n) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`${i < n ? "text-yellow-400" : "text-base-content/40"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-base-100 rounded-2xl shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">My Reviews</h3>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by scholarship, university or comment..."
            className="input input-sm w-full md:w-96 bg-base-200"
          />
          <div className="ml-auto md:ml-0 text-sm text-base-content/60">
            Showing {visible.length} reviews
          </div>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th className="hidden lg:inline">Review Date</th>
              <th className="">Rating</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-sm text-base-content/60 py-6">
                  No reviews found
                </td>
              </tr>
            )}

            {visible.map((r) => (
              <tr key={r.id}>
                <td className="min-w-0">
                  <div className="font-medium">{r.scholarshipName}</div>
                </td>

                <td className="min-w-0">
                  <div className="text-sm text-base-content/70">{r.university}</div>
                </td>

                <td className="max-w-xl">
                  <div className="text-sm text-base-content/80 line-clamp-2">{r.comment}</div>
                </td>

                <td className="hidden lg:block">{r.date}</td>

                <td className="">{r.rating}</td>

                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(r)}
                      className="btn btn-sm bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
                    >
                      <FaEdit /> <span className="hidden lg:inline">Edit</span>
                    </button>

                    <button
                      onClick={() => deleteReview(r.id)}
                      className="btn btn-sm bg-red-400 text-white hover:bg-red-500 flex items-center gap-2"
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

      {/* Mobile Cards*/}
      <div className="md:hidden grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {visible.length === 0 && (
          <div className="text-center text-sm text-base-content/60 py-6">No reviews found</div>
        )}

        {visible.map((r) => (
          <article
            key={r.id}
            className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col lg:flex-row items-start gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-medium text-pink-600">{r.scholarshipName}</h4>
                  <p className="text-sm text-base-content/60 truncate">{r.university}</p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs text-base-content/60">Reviewed</div>
                  <div className="text-sm font-medium">{r.date}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-base-content/80 line-clamp-3">
                {r.comment}
              </div>

              <div className="mt-3">{renderStars(r.rating)}</div>
            </div>

            <div className="w-full lg:w-auto grid grid-cols-1 items-center gap-2 mt-3 lg:mt-0">
              <button
                onClick={() => openEdit(r)}
                className="btn btn-sm bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
              >
                <FaEdit /> <span className="">Edit</span>
              </button>

              <button
                onClick={() => deleteReview(r.id)}
                className="btn btn-sm bg-red-400 text-white hover:bg-red-500 flex items-center gap-2"
              >
                <FaTrash /> <span className="">Delete</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />
          <div className="relative w-full max-w-md bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-3">Edit Review</h4>

            <div className="grid gap-3">
              <label className="text-sm text-base-content/70">Scholarship</label>
              <div className="font-medium">{editModal.scholarshipName}</div>

              <label className="text-sm text-base-content/70">University</label>
              <div className="text-sm text-base-content/80 mb-2">{editModal.university}</div>

              <label className="text-sm text-base-content/70">Your Rating</label>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setDraftRating(n)}
                    className={`p-2 rounded ${draftRating >= n ? "bg-yellow-400 text-white" : "bg-base-200 text-base-content/70"}`}
                    aria-label={`Rate ${n}`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>

              <label className="text-sm text-base-content/70">Comment</label>
              <textarea
                rows={5}
                value={draftComment}
                onChange={(e) => setDraftComment(e.target.value)}
                className="w-full px-3 py-2 rounded bg-base-200"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeEdit} className="px-3 py-2 rounded bg-base-200">Cancel</button>
              <button onClick={saveEdit} className="px-3 py-2 rounded bg-green-500 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
