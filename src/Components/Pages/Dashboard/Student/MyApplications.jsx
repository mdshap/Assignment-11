import React, { useEffect, useState, use } from "react";
import { FaInfoCircle, FaEdit, FaTrash, FaStar } from "react-icons/fa";

import axiosProvider from "../../../../API/axiosProvider";
import { AuthContext } from "../../../../Authentication/AuthContext";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

const MyApplications = () => {
  const { userFromDb } = use(AuthContext);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [detailsModal, setDetailsModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    if (!userFromDb?._id) return;
    setLoading(true);

    axiosProvider
      .get(`/applications/${userFromDb._id}`)
      .then((res) => {
        setList(res.data || []);
      })
      .finally(() => setLoading(false));
  }, [userFromDb]);

  const openDetails = (it) => setDetailsModal(it);
  const closeDetails = () => setDetailsModal(null);

  const openEdit = (it) => setEditModal({ ...it });
  const closeEdit = () => setEditModal(null);

  const openReview = (it) => {
    setReviewModal(it);
    setReviewText(it?.reviewComment || "");
    setReviewRating(it?.rating || 0);
  };
  const closeReview = () => {
    setReviewModal(null);
    setReviewText("");
    setReviewRating(0);
  };

  const saveEdit = async () => {
    if (!editModal) return;

    await axiosProvider.patch(`/applications/${editModal._id}`, {
      userName: editModal.userName,
      userEmail: editModal.userEmail,
    });

    setList((prev) =>
      prev.map((app) =>
        app._id === editModal._id
          ? {
              ...app,
              userName: editModal.userName,
              userEmail: editModal.userEmail,
            }
          : app
      )
    );

    toast.success("Application updated");
    closeEdit();
  };

  const deleteApp = async (id) => {
    if (!confirm("Delete this application?")) return;

    await axiosProvider.delete(`/applications/${id}`).then(() => {
      toast.error("Deleted Application");
    });

    setList((prev) => prev.filter((app) => app._id !== id));
  };

  const submitReview = async () => {
    if (!reviewRating || !reviewText) {
      toast.error("Please give rating and comment");
      return;
    }

    if (reviewModal.reviewComment) {
      toast.error("Already Reviewed");
      return;
    }

    await axiosProvider
      .post("/reviews", {
        applicationId: reviewModal._id,
        scholarshipId: reviewModal.scholarshipId,
        scholarshipName: reviewModal.scholarshipName,

        universityName: reviewModal.universityName,
        universityCity: reviewModal.universityCity,
        universityCountry: reviewModal.universityCountry,

        userId: userFromDb._id,
        userName: userFromDb.name,
        userEmail: userFromDb.email,
        userImage: userFromDb.photoURL,

        rating: reviewRating,
        comment: reviewText,
      })
      .then(() => {
        toast.success("Submitted Your Review");
      })
      .catch(() => toast.error("You Already Reviewed"));

    closeReview();
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">My Applications</h3>

      {loading && (
        <div className="text-sm text-base-content/60">
          <Loader />
        </div>
      )}

      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th className="text-left">University</th>
              <th className="text-left">Feedback</th>
              <th>Subject</th>
              <th>Application Fees</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading && list.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-sm py-6">
                  No applications found
                </td>
              </tr>
            )}

            {list.map((it) => (
              <tr key={it._id}>
                <td>
                  <div className="font-medium">{it.universityName}</div>
                  <div className="text-sm text-base-content/60">
                    Applied: {new Date(it.applicationDate).toLocaleDateString()}
                  </div>
                </td>

                <td className="text-sm">{it.feedback || "—"}</td>

                <td className="text-center">{it.degree}</td>

                <td className="text-center">
                  ${it.applicationFees}
                  <div
                    className={`text-xs rounded-xl w-15 mx-auto py-1 mt-1 ${
                      it.paymentStatus === "PAID"
                        ? "bg-green-600 text-white"
                        : "bg-red-300 text-red-700"
                    }`}>
                    {it.paymentStatus}
                  </div>
                </td>

                <td className="text-center">
                  <span
                    className={`font-bold  ${
                      it.applicationStatus === "pending"
                        ? "text-yellow-500"
                        : it.applicationStatus === "completed"
                        ? "text-green-700"
                        : "text-red-600"
                    }`}>
                    {it.applicationStatus}
                  </span>
                </td>

                <td className="text-right">
                  <div className="grid gap-2 justify-end">
                    <button
                      onClick={() => openDetails(it)}
                      className="btn btn-sm bg-base-200">
                      <FaInfoCircle /> Details
                    </button>

                    {it.applicationStatus === "pending" && (
                      <>
                        <button
                          onClick={() => openEdit(it)}
                          className="btn btn-sm bg-green-600 text-white">
                          <FaEdit /> Edit
                        </button>

                        <button
                          onClick={() => deleteApp(it._id)}
                          className="btn btn-sm bg-red-400 text-white">
                          <FaTrash /> Delete
                        </button>
                      </>
                    )}

                    {it.applicationStatus === "completed" && (
                      <button
                        onClick={() => openReview(it)}
                        className="btn btn-sm bg-pink-500 text-white">
                        <FaStar /> Review
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*MOBILE*/}
      <div className="lg:hidden space-y-4">
        {!loading && list.length === 0 && (
          <div className="text-sm text-base-content/60">
            No applications found
          </div>
        )}

        {list.map((it) => (
          <div
            key={it._id}
            className="p-3 rounded-lg bg-base-200 border border-base-300">
            <div className="flex justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-pink-600">
                  {it.universityName}
                </div>

                <div className="text-sm text-base-content/70">{it.degree}</div>

                <div className="text-xs mt-1 text-base-content/60">
                  Applied: {new Date(it.applicationDate).toLocaleDateString()}
                </div>

                <div className="text-xs flex gap-3 mt-1 text-base-content/60">
                  Fees: ${it.applicationFees}
                  <span
                    className={` px-2 py-0.5 rounded-full  ${
                      it.paymentStatus === "PAID"
                        ? "bg-green-600 text-white"
                        : "bg-red-300 text-red-700"
                    }`}>
                    {it.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col justify-between">
                <div
                  className={` px-2 ml-8 py-1 w-18 rounded-xl text-xs text-center ${
                    it.applicationStatus === "completed"
                      ? "bg-green-100 text-green-700"
                      : it.applicationStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-600"
                  }`}>
                  {it.applicationStatus}
                </div>

                <button
                  onClick={() => openDetails(it)}
                  className="btn border-none bg-transparent">
                  <FaInfoCircle /> Details
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {it.applicationStatus === "pending" && (
                <>
                  <button
                    onClick={() => openEdit(it)}
                    className="btn py-1 rounded bg-green-600 text-white text-sm flex items-center justify-center gap-2">
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => deleteApp(it._id)}
                    className="btn py-1 rounded bg-red-400 text-white text-sm flex items-center justify-center gap-2">
                    <FaTrash /> Delete
                  </button>
                </>
              )}

              {it.applicationStatus === "completed" && (
                <button
                  onClick={() => openReview(it)}
                  className="btn py-1 col-span-2 rounded bg-pink-500 text-white text-sm flex items-center justify-center gap-2">
                  <FaStar /> Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {detailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeDetails}
          />

          <div
            className="
        relative
        w-full
        max-w-3xl
        bg-base-100
        rounded-2xl
        shadow-lg
        max-h-[90vh]
        overflow-y-auto
        p-4
        sm:p-6
      ">
            <div className="mb-4 border-b pb-3">
              <h4 className="text-lg sm:text-xl font-semibold">
                Application Details
              </h4>
              <p className="text-xs sm:text-sm text-base-content/60 mt-1">
                Submitted on{" "}
                {new Date(detailsModal.applicationDate).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-base-content/60">University</p>
                  <p className="font-medium">{detailsModal.universityName}</p>
                </div>

                <div>
                  <p className="text-xs text-base-content/60">Degree</p>
                  <p className="font-medium">{detailsModal.degree}</p>
                </div>

                <div>
                  <p className="text-xs text-base-content/60">
                    Scholarship Category
                  </p>
                  <p className="font-medium">
                    {detailsModal.scholarshipCategory || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-base-content/60">
                    Application Status
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      detailsModal.applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : detailsModal.applicationStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}>
                    {detailsModal.applicationStatus}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-base-content/60">Payment Status</p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      detailsModal.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {detailsModal.paymentStatus}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-base-content/60">
                    Application Fee
                  </p>
                  <p className="font-medium">${detailsModal.applicationFees}</p>
                </div>

                <div>
                  <p className="text-xs text-base-content/60">Service Charge</p>
                  <p className="font-medium">
                    ${detailsModal.serviceCharge || 0}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-base-content/60">Total Paid</p>
                  <p className="text-lg font-semibold text-green-600">
                    $
                    {Number(detailsModal.applicationFees) +
                      Number(detailsModal.serviceCharge || 0)}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs text-base-content/60 mb-1">
                  Moderator Feedback
                </p>
                <div className="p-3 rounded-lg bg-base-200 text-sm">
                  {detailsModal.feedback || "No feedback provided yet."}
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={closeDetails} className="btn px-6">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeReview} />

          <div className="relative w-full max-w-md bg-base-100 p-5 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-4">Add Review</h4>

            <div className="mb-4">
              <p className="text-sm mb-2">Your Rating</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`p-2 rounded ${
                      reviewRating >= star
                        ? "bg-yellow-400 text-white"
                        : "bg-base-200 text-base-content/60"
                    }`}>
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm">Comment</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full mt-1 px-3 py-2 rounded bg-base-200"
                placeholder="Write your experience..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={closeReview} className="btn btn-sm bg-base-200">
                Cancel
              </button>

              <button
                onClick={() => submitReview()}
                className="btn btn-sm bg-green-600 text-white">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />

          <div className="relative w-full max-w-md bg-base-100 p-5 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-4">Edit Application</h4>

            <div className="mb-4">
              <label className="text-sm text-base-content/70">Name</label>
              <input
                type="text"
                value={editModal.userName}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                className="w-full mt-1 px-3 py-2 rounded bg-base-200"
              />
            </div>

            <div className="mb-5">
              <label className="text-sm text-base-content/70">Email</label>
              <input
                type="email"
                value={editModal.userEmail}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    userEmail: e.target.value,
                  }))
                }
                className="w-full mt-1 px-3 py-2 rounded bg-base-200"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={closeEdit} className="btn btn-sm bg-base-200">
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="btn btn-sm bg-green-600 text-white">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
