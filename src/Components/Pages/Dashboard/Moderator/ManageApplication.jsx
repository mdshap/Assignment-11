import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaCommentDots, FaTimesCircle } from "react-icons/fa";
import axiosProvider from "../../../../API/axiosProvider";
import toast from "react-hot-toast";

const ManageApplications = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [detailsModal, setDetailsModal] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    setLoading(true);

    axiosProvider
      .get("/applications")
      .then((res) => {
        setList(res.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const openDetails = (app) => setDetailsModal(app);
  const closeDetails = () => setDetailsModal(null);

  const openFeedback = (app) => {
    setFeedbackModal(app);
    setFeedbackText(app.feedback || "");
  };

  const closeFeedback = () => {
    setFeedbackModal(null);
    setFeedbackText("");
  };

  const saveFeedback = async () => {
    if (!feedbackText.trim()) {
      toast.error("Feedback is required");
      return;
    }

    await axiosProvider.patch(`/applications/${feedbackModal._id}`, {
      feedback: feedbackText,
    });

    setList((prev) =>
      prev.map((app) =>
        app._id === feedbackModal._id ? { ...app, feedback: feedbackText } : app
      )
    );

    toast.success("Feedback submitted");
    closeFeedback();
  };

  const updateStatus = async (id, status) => {
    await axiosProvider.patch(`/applications/${id}`, {
      applicationStatus: status,
    });

    setList((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, applicationStatus: status } : app
      )
    );
  };

  const cancelApplication = async (id) => {
    if (!confirm("Reject this application?")) return;

    await axiosProvider.patch(`/applications/${id}`, {
      applicationStatus: "rejected",
    });

    setList((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, applicationStatus: "rejected" } : app
      )
    );
  };

  return (
    <div className="w-full max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">Manage Applied Applications</h3>
      </div>

      {loading && (
        <div className="text-sm text-base-content/60">Loading...</div>
      )}

      <div className="overflow-x-auto hidden lg:block">
        <table className="table xl:w-full">
          <thead>
            <tr>
              <th>user</th>
              <th>University</th>
              <th>Scholarship</th>
              <th>Status</th>
              <th>Payment Status</th>
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

            {list.map((a) => (
              <tr key={a.id}>
                <td>
                  <div className="font-medium text-pink-500">{a.userName}</div>
                  <div className="text-sm">{a.userEmail}</div>
                  <div className="text-xs mt-1">{a.applicationDate}</div>
                </td>

                <td className="text-green-600">{a.universityName}</td>

                <td>
                  <div className="font-medium">{a.scholarshipName}</div>
                  <div className="text-sm">{a.degree}</div>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      a.applicationStatus === "completed"
                        ? "bg-green-100 text-green-700"
                        : a.applicationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {a.applicationStatus}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      a.paymentStatus === "PAID"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                    {a.paymentStatus}
                  </span>
                </td>

                <td className="text-right">
                  <div className="grid gap-1 justify-end">
                    <button
                      onClick={() => openDetails(a)}
                      className="btn btn-sm bg-green-600 text-white">
                      <FaInfoCircle /> Details
                    </button>

                    <button
                      onClick={() => openFeedback(a)}
                      className="btn btn-sm bg-blue-500 text-white">
                      <FaCommentDots /> Feedback
                    </button>
                    {a.applicationStatus === "rejected" || (
                      <>
                        <select
                          defaultValue={a.applicationStatus}
                          onChange={(e) => updateStatus(a._id, e.target.value)}
                          className="select select-sm bg-base-300 text-gray-800">
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>

                        <button
                          onClick={() => cancelApplication(a._id)}
                          className="btn btn-sm bg-red-400 text-white">
                          <FaTimesCircle /> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-3 mt-4">
        {list.map((a) => (
          <div
            key={a._id}
            className="p-3 rounded-lg bg-base-200 border border-gray-400">
            <div className="font-medium text-pink-600">{a.userName}</div>
            <div className="text-sm">{a.userEmail}</div>
            <div className="text-sm font-bold mt-1">{a.scholarshipName}</div>
            <div className="text-sm text-green-700">{a.universityName}</div>
            <div className="text-xs mt-2">Applied: {a.applicationDate}</div>

            <div className="mt-2 flex justify-between">
              <span
                className={`px-2 py-1 rounded text-sm ${
                  a.paymentStatus === "PAID"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}>
                {a.paymentStatus}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  a.applicationStatus === "completed"
                    ? "bg-green-100 text-green-700"
                    : a.applicationStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {a.applicationStatus}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => openDetails(a)}
                className="btn bg-green-600 text-white">
                <FaCommentDots /> Details
              </button>
              <button
                onClick={() => openFeedback(a)}
                className="btn bg-blue-500 text-white">
                <FaCommentDots /> Feedback
              </button>

              {a.applicationStatus === "rejected" || (
                <>
                  <select
                    defaultValue={a.applicationStatus}
                    onChange={(e) => updateStatus(a._id, e.target.value)}
                    className="select select-sm bg-base-300 text-gray-800">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => cancelApplication(a._id)}
                    className="btn btn-sm bg-red-400 text-white">
                    <FaTimesCircle /> Cancel
                  </button>
                </>
              )}
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
            <h4 className="text-lg font-semibold mb-3">Application Details</h4>
            <p>{detailsModal.userName}</p>
            <p>{detailsModal.userEmail}</p>
            <p>{detailsModal.scholarshipName}</p>
            <p>{detailsModal.universityName}</p>
            <div className="mt-4 text-right">
              <button onClick={closeDetails} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeFeedback}
          />
          <div className="relative w-full max-w-md bg-base-100 p-4 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-3">Write Feedback</h4>
            <textarea
              rows={5}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full px-3 py-2 rounded bg-base-200"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={closeFeedback} className="btn bg-base-200">
                Cancel
              </button>
              <button
                onClick={saveFeedback}
                className="btn bg-green-500 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
