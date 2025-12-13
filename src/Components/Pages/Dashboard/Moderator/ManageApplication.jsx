import React, { useState } from "react";
import { FaInfoCircle, FaCommentDots, FaTimesCircle } from "react-icons/fa";

const ManageApplications = ({ initial = [], onChange = () => {} }) => {
  const dummy = initial.length
    ? initial
    : [
        {
          id: "app1",
          applicantName: "Aisha Rahman",
          applicantEmail: "aisha@studentmail.com",
          universityName: "Harvard University",
          scholarshipName: "Global Excellence Scholarship",
          applicationFeedback: "",
          applicationStatus: "Processing",
          paymentStatus: "Paid",
          appliedOn: "2025-01-15",
          details:
            "Applying for Bachelors in Computer Science. GPA: 3.9. Portfolio included.",
          degree: "Bachelors",
          country: "USA",
        },
        {
          id: "app2",
          applicantName: "Rafi Ahmed",
          applicantEmail: "rafi@studentmail.com",
          universityName: "University of Toronto",
          scholarshipName: "International Merit Award",
          applicationFeedback: "Good candidate, verify transcripts.",
          applicationStatus: "Completed",
          paymentStatus: "Paid",
          appliedOn: "2025-01-05",
          details:
            "Masters in Engineering. Work experience: 2 years. Recommendation letters attached.",
          degree: "Masters",
          country: "Canada",
        },
        {
          id: "app3",
          applicantName: "Sadia Khan",
          applicantEmail: "sadia@studentmail.com",
          universityName: "University of Tokyo",
          scholarshipName: "Asian Scholars Grant",
          applicationFeedback: "",
          applicationStatus: "Processing",
          paymentStatus: "Unpaid",
          appliedOn: "2025-02-03",
          details:
            "PhD in Physics. Published 2 papers. Needs fee waiver consideration.",
          degree: "PhD",
          country: "Japan",
        },
      ];

  const [list, setList] = useState(dummy);
  const [detailsModal, setDetailsModal] = useState(null); 
  const [feedbackModal, setFeedbackModal] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const openDetails = (app) => setDetailsModal(app);
  const closeDetails = () => setDetailsModal(null);

  const openFeedback = (app) => {
    setFeedbackModal(app.id);
    setFeedbackText(app.applicationFeedback || "");
  };
  const closeFeedback = () => {
    setFeedbackModal(null);
    setFeedbackText("");
  };

  const saveFeedback = () => {
    setList((prev) => {
      const next = prev.map((p) =>
        p.id === feedbackModal ? { ...p, applicationFeedback: feedbackText } : p
      );
      onChange(next);
      return next;
    });
    closeFeedback();
  };

  const updateStatus = (id, status) => {
    setList((prev) => {
      const next = prev.map((p) =>
        p.id === id ? { ...p, applicationStatus: status } : p
      );
      onChange(next);
      return next;
    });
  };

  const cancelApplication = (id) => {
    if (!window.confirm("Reject this application?")) return;
    updateStatus(id, "rejected");
  };

  return (
    <div className="w-full max-w-2xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">Manage Applied Applications</h3>
        <div className="flex items-center gap-2 w-full md:w-auto"></div>
      </div>

      <div className="overflow-x-auto">
        <div className="">
          <div className="hidden lg:block">
            <table className="table mx-auto xl:w-full">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>University</th>
                  <th>Scholarship</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-sm text-base-content/60 py-6">
                      No applications found
                    </td>
                  </tr>
                )}
                {list.map((a) => (
                  <tr key={a.id}>
                    <td className="w-10 xl:w-30">
                      <div className="font-medium text-pink-500 ">{a.applicantName}</div>
                      <div className="text-sm text-base-content/60">
                        {a.applicantEmail}
                      </div>
                      <div className="text-xs text-base-content/50 mt-1">
                        {a.appliedOn}
                      </div>
                    </td>
                    <td className="w-10 xl:w-20 text-green-600">{a.universityName}</td>
                    <td className="w-10 xl:w-30">
                      <div className="font-medium ">{a.scholarshipName}</div>
                      <div className="text-sm text-base-content/60">
                        {a.degree}
                      </div>
                    </td>
                    <td className="w-10 xl:w-20">
                      <div
                        className={
                          "inline-block px-3 py-1 rounded-full text-sm  " +
                          (a.applicationStatus === "Completed"
                            ? "bg-green-100 text-green-700"
                            : a.applicationStatus === "Processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : a.applicationStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700")
                        }>
                        {a.applicationStatus}
                      </div>
                    </td>
                    <td className="w-10 xl:w-30 ">
                      <div
                        className={
                          "inline-block px-2 py-1 rounded text-sm " +
                          (a.paymentStatus === "Paid"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700")
                        }>
                        {a.paymentStatus}
                      </div>
                    </td>

                    <td className="text-right w-10 xl:w-20">
                      <div className="grid items-center justify-end gap-1 ">
                        <button
                          onClick={() => openDetails(a)}
                          className="btn btn-sm bg-green-600 text-white w-10 lg:w-full">
                          <FaInfoCircle />{" "}
                          <span className="ml-2 hidden lg:inline">Details</span>
                        </button>

                        <button
                          onClick={() => openFeedback(a)}
                          className="btn btn-sm bg-blue-500 text-white w-10 lg:w-full">
                          <FaCommentDots />{" "}
                          <span className="ml-2 hidden lg:inline">
                            Feedback
                          </span>
                        </button>

                        <div className="w-auto">
                          <select
                            value={a.applicationStatus}
                            onChange={(e) => updateStatus(a.id, e.target.value)}
                            className="select select-sm text-white btn bg-pink-400 w-10 lg:w-full">
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>

                        <button
                          onClick={() => cancelApplication(a.id)}
                          className="btn btn-sm bg-red-400 text-white w-10 lg:w-full">
                          <FaTimesCircle />{" "}
                          <span className="ml-2 hidden lg:inline">Cancel</span>
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

      {/* mobile device */}
      <div className="lg:hidden space-y-3 mt-4">
        {list.length === 0 && (
          <div className="text-sm text-base-content/60">
            No applications found
          </div>
        )}
        {list.map((a) => (
          <div key={a.id} className="p-3 rounded-lg bg-base-200 border border-gray-400">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-pink-600">{a.applicantName}</div>
                <div className="text-sm text-base-content/70 truncate">
                  {a.applicantEmail}
                </div>
                <div className=" gap-2">
                  <div className="text-sm text-black font-bold mt-1 truncate">
                    {a.scholarshipName}
                  </div>
                  <div className="text-sm  mt-1 text-green-700 truncate">
                    {a.universityName}{" "}
                  </div>
                </div>

                <div className="text-xs mt-2 text-base-content/50">
                  Applied: {a.appliedOn}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div
                  className={
                    "inline-block px-2 py-1 rounded text-xs " +
                    (a.applicationStatus === "Completed"
                      ? "bg-green-100 text-green-700"
                      : a.applicationStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700")
                  }>
                  {a.applicationStatus}
                </div>
                <div className="text-sm mt-2">{a.paymentStatus}</div>
              </div>
            </div>

            <div className="mt-3 grid  grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => openDetails(a)}
                className="px-2 btn py-1 rounded  text-sm bg-green-600 text-white">
                <FaInfoCircle />{" "} Details
              </button>
              <button
                onClick={() => openFeedback(a)}
                className="px-2 btn py-1 rounded  bg-blue-500 text-white text-sm">
               <FaCommentDots />{" "}  Feedback
              </button>

              <select
                value={a.applicationStatus}
                onChange={(e) => updateStatus(a.id, e.target.value)}
                className="select text-white btn bg-pink-400">
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => cancelApplication(a.id)}
                className="px-2 py-1 rounded bg-red-400 text-white font-semibold text-sm">
                Cancel
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
          <div className="relative w-full max-w-md md:max-w-2xl bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-3">Application Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-base-content/70">Applicant</div>
                <div className="font-medium">{detailsModal.applicantName}</div>
                <div className="text-sm">{detailsModal.applicantEmail}</div>
                <div className="text-sm mt-2 text-base-content/70">
                  Applied On: {detailsModal.appliedOn}
                </div>
              </div>
              <div>
                <div className="text-sm text-base-content/70">Scholarship</div>
                <div className="font-medium">
                  {detailsModal.scholarshipName}
                </div>
                <div className="text-sm">{detailsModal.universityName}</div>
                <div className="text-sm mt-2">
                  {detailsModal.degree} • {detailsModal.country}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-base-content/70">Full Details</div>
                <div className="mt-2 text-sm">{detailsModal.details}</div>
              </div>
              <div className="md:col-span-2">
                <div className="text-sm text-base-content/70">Feedback</div>
                <div className="mt-2 text-sm">
                  {detailsModal.applicationFeedback || "—"}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={closeDetails}
                className="px-3 py-2 rounded bg-base-200">
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
            <div>
              <label className="text-sm text-base-content/70">For</label>
              <div className="font-medium mb-2">
                {list.find((x) => x.id === feedbackModal)?.applicantName}
              </div>
              <textarea
                rows={5}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full px-3 py-2 rounded border bg-base-200"
              />
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={closeFeedback}
                className="px-3 py-2 rounded bg-base-200">
                Cancel
              </button>
              <button
                onClick={saveFeedback}
                className="px-3 py-2 rounded bg-green-500 text-white">
                Save Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
