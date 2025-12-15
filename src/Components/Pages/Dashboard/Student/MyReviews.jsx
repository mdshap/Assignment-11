import React, { useEffect, useState, use } from "react";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import axiosProvider from "../../../../API/axiosProvider";
import { AuthContext } from "../../../../Authentication/AuthContext";
import toast from "react-hot-toast";

const MyReviews = () => {
  const { userFromDb } = use(AuthContext);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [draftComment, setDraftComment] = useState("");
  const [draftRating, setDraftRating] = useState(0);

  useEffect(() => {
    if (!userFromDb?.email) return;

    setLoading(true);
    axiosProvider
      .get(`/reviews/${userFromDb._id}`)
      .then((res) => {
        const mapped = res.data.map((r) => ({
          _id: r._id,
          scholarshipName: r.scholarshipName,
          university: r.universityName,
          comment: r.reviewComment,
          date: new Date(r.reviewDate).toISOString().slice(0, 10),
          rating: r.ratingPoint,
        }));
        setList(mapped);
      })
      .finally(() => setLoading(false));
  }, [userFromDb]);

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

const saveEdit = async () => {
  if (!editModal) return;

  await axiosProvider.patch(`/reviews/${editModal._id}`, {
    ratingPoint: draftRating,
    reviewComment: draftComment,
  })
  .then(()=>{
    toast.success('Updated')
  });

  setList((prev) =>
    prev.map((r) =>
      r._id === editModal._id
        ? {
            ...r,
            rating: draftRating,
            comment: draftComment,
            date: new Date().toISOString().slice(0, 10),
          }
        : r
    )
  );

  closeEdit();
};


  const deleteReview = async (id) => {
    if (!confirm("Delete this review? This cannot be undone.")) return;

    await axiosProvider.delete(`/reviews/${id}`)
    .then(()=>{
      toast.error('Review Deleted')
    })
    setList((prev) => prev.filter((p) => p._id !== id));
  };

  const renderStars = (n) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          className={i < n ? "text-yellow-400" : "text-base-content/40"}
        />
      ))}
    </div>
  );

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

      {loading && (
        <div className="text-sm text-base-content/60">Loading...</div>
      )}

      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th className="">Review Date</th>
              <th>Rating</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && visible.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-sm py-6">
                  No reviews found
                </td>
              </tr>
            )}

            {visible.map((r) => (
              <tr key={r._id}>
                <td className="font-medium">{r.scholarshipName}</td>
                <td className="text-sm">{r.university}</td>
                <td className="max-w-xl line-clamp-2 text-sm">{r.comment}</td>
                <td className="">{r.date}</td>
                <td>{renderStars(r.rating)}</td>

                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(r)}
                      className="btn btn-sm bg-green-600 text-white">
                      <FaEdit /> Edit
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

      {/*MOBILE*/}
      <div className="lg:hidden grid gap-4 sm:grid-cols-2">
        {!loading && visible.length === 0 && (
          <div className="text-center text-sm py-6">No reviews found</div>
        )}

        {visible.map((r) => (
          <article
            key={r._id}
            className="bg-base-200 border border-white/10 rounded-lg p-4">
            <h4 className="font-medium text-pink-600">{r.scholarshipName}</h4>
            <p className="text-sm text-base-content/60">{r.university}</p>
            <p className="mt-2 text-sm line-clamp-3">{r.comment}</p>
            <div className="mt-2">{renderStars(r.rating)}</div>

            <div className="mt-3 grid gap-2">
              <button
                onClick={() => openEdit(r)}
                className="btn btn-sm bg-green-600 text-white">
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => deleteReview(r._id)}
                className="btn btn-sm bg-red-400 text-white">
                <FaTrash /> Delete
              </button>
            </div>
          </article>
        ))}

        
      </div>
      {editModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />

            <div className="relative w-full max-w-md bg-base-100 p-5 rounded-2xl shadow">
              <h4 className="text-lg font-semibold mb-4">Edit Review</h4>

              <div className="mb-3">
                <p className="font-medium">{editModal.scholarshipName}</p>
                <p className="text-sm text-base-content/60">
                  {editModal.university}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-base-content/70 mb-2">Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setDraftRating(n)}
                      className={`p-2 rounded ${
                        draftRating >= n
                          ? "bg-yellow-400 text-white"
                          : "bg-base-200 text-base-content/60"
                      }`}>
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-base-content/70 mb-2">Comment</p>
                <textarea
                  rows={4}
                  value={draftComment}
                  onChange={(e) => setDraftComment(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-base-200"
                  placeholder="Write your review..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeEdit}
                  className="px-4 py-2 rounded bg-base-200">
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 rounded bg-green-600 text-white">
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MyReviews;
