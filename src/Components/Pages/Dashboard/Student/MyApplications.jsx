import React, { useState } from "react";
import {
  FaInfoCircle,
  FaEdit,
  FaTrash,
  FaCreditCard,
  FaStar,
} from "react-icons/fa";


const dummy = [
  {
    id: "ma1",
    universityName: "Harvard University",
    universityAddress: "Massachusetts Hall, Cambridge, MA, USA",
    scholarshipName: "Global Excellence Scholarship",
    subjectCategory: "Computer Science",
    applicationFees: "50",
    applicationStatus: "pending", 
    paymentStatus: "Unpaid", 
    appliedOn: "2025-01-15",
    feedback: "Documents verified. Waiting for final review.",
    details:
      "Applying for Bachelors in Computer Science. GPA: 3.9. Portfolio included. Transcripts attached.",
  },
  {
    id: "ma2",
    universityName: "University of Toronto",
    universityAddress: "27 King's College Cir, Toronto, ON, Canada",
    scholarshipName: "International Merit Award",
    subjectCategory: "Engineering",
    applicationFees: "0",
    applicationStatus: "completed",
    paymentStatus: "Paid",
    appliedOn: "2024-12-22",
    feedback: "Great profile — scholarship awarded.",
    details:
      "Masters in Engineering. Work experience: 2 years. Recommendation letters attached.",
  },
  {
    id: "ma3",
    universityName: "University of Tokyo",
    universityAddress: "7 Chome-3-1 Hongo, Bunkyo City, Tokyo, Japan",
    scholarshipName: "Asian Scholars Grant",
    subjectCategory: "Physics",
    applicationFees: "30",
    applicationStatus: "pending",
    paymentStatus: "Paid",
    appliedOn: "2025-02-03",
    feedback: "",
    details:
      "PhD in Physics. Published 2 papers. Needs fee waiver consideration.",
  },
];

const MyApplications = ({ initial = [] , onChange = () => {} }) => {
  const [list, setList] = useState(initial.length ? initial : dummy);


  const [detailsModal, setDetailsModal] = useState(null);
  const [editModal, setEditModal] = useState(null); // 
  const [reviewModal, setReviewModal] = useState(null); // 
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // helpers
  const openDetails = (it) => setDetailsModal(it);
  const closeDetails = () => setDetailsModal(null);

  const openEdit = (it) => setEditModal({ ...it });
  const closeEdit = () => setEditModal(null);

  const openReview = (it) => {
    setReviewModal(it);
    setReviewText(it?.userReview || "");
    setReviewRating(it?.userRating || 0);
  };
  const closeReview = () => {
    setReviewModal(null);
    setReviewText("");
    setReviewRating(0);
  };

  const saveEdit = () => {
    if (!editModal) return;
    setList((prev) => {
      const next = prev.map((p) => (p.id === editModal.id ? editModal : p));
      onChange(next);
      return next;
    });
    closeEdit();
  };

  const payNow = (id) => {

    setList((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, paymentStatus: "Paid" } : p));
      onChange(next);
      return next;
    });
    alert("Payment successful (simulated).");
  };

  const deleteApp = (id) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    setList((prev) => {
      const next = prev.filter((p) => p.id !== id);
      onChange(next);
      return next;
    });
  };

  const submitReview = () => {
    if (!reviewModal) return;
    setList((prev) => {
      const next = prev.map((p) =>
        p.id === reviewModal.id ? { ...p, userReview: reviewText, userRating: reviewRating } : p
      );
      onChange(next);
      return next;
    });
    closeReview();
    alert("Review submitted (local).");
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">My Applications</h3>
      </div>


      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>University</th>
              <th>Feedback</th>
              <th>Subject</th>
              <th>Application Fees</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-sm text-base-content/60 py-6">
                  No applications found
                </td>
              </tr>
            )}

            {list.map((it) => (
              <tr key={it.id}>
                <td className="min-w-0">
                  <div className="font-medium">{it.universityName}</div>
                  <div className="text-sm text-base-content/60">{it.universityAddress}</div>
                  <div className="text-sm mt-1 text-base-content/50">Applied: {it.appliedOn}</div>
                </td>

                <td className="min-w-0">
                  <div className="text-sm text-base-content/80">{it.feedback || "—"}</div>
                </td>

                <td>{it.subjectCategory}</td>

                <td className="text-center">${it.applicationFees}
                    <div className={`text-xs rounded-xl w-15 mx-auto py-1 mt-1 text-base-content/60 ${(it.paymentStatus === "Paid"
                        ? "bg-green-400 text-green-800"
                        : it.applicationStatus === "Unapid"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-300 text-red-700")}`}>{it.paymentStatus}</div>
                </td>

                <td>
                  <div
                    className={
                      "inline-block px-3 py-1 rounded-full text-sm " +
                      (it.applicationStatus === "completed"
                        ? "font-bold text-green-700"
                        : it.applicationStatus === "pending"
                        ? " font-bold text-yellow-500"
                        : " text-red-600")
                    }
                  >
                    {it.applicationStatus}
                  </div>
                  
                </td>

                <td className="text-right">
                  <div className="grid justify-end gap-2">
                    <button
                      onClick={() => openDetails(it)}
                      className="btn btn-sm bg-base-200 hover:bg-base-300 flex items-center gap-2 justify-center"
                    >
                      <FaInfoCircle /> <span className="ml-2 hidden xl:inline">Details</span>
                    </button>


                    {it.applicationStatus === "pending" && (
                      <button
                        onClick={() => openEdit(it)}
                        className="btn btn-sm bg-green-600 text-white hover:bg-green-700 flex items-center gap-2 justify-center"
                      >
                        <FaEdit /> <span className="ml-2 hidden xl:inline">Edit</span>
                      </button>
                    )}


                    {it.applicationStatus === "pending" && it.paymentStatus === "Unpaid" && (
                      <button
                        onClick={() => payNow(it.id)}
                        className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2 justify-center"
                      >
                        <FaCreditCard /> <span className="ml-2 hidden xl:inline">Pay</span>
                      </button>
                    )}


                    {it.applicationStatus === "pending" && (
                      <button
                        onClick={() => deleteApp(it.id)}
                        className="btn btn-sm bg-red-400 text-white hover:bg-red-500 flex items-center gap-2 justify-center"
                      >
                        <FaTrash /> <span className="ml-2 hidden xl:inline">Delete</span>
                      </button>
                    )}

                    {it.applicationStatus === "completed" && (
                      <button
                        onClick={() => openReview(it)}
                        className="btn btn-sm bg-pink-500 text-white hover:bg-pink-600 flex items-center gap-2 justify-center"
                      >
                        <FaStar /> <span className="ml-2 hidden xl:inline">Review</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {list.length === 0 && <div className="text-sm text-base-content/60">No applications found</div>}

        {list.map((it) => (
          <div key={it.id} className="p-3 rounded-lg bg-base-200 border border-base-300">
            <div className="flex justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-pink-600">{it.universityName}</div>
                <div className="text-sm text-base-content/70">{it.universityAddress}</div>
                <div className="text-sm mt-1 text-base-content/60">Applied: {it.appliedOn}</div>

                <div className="mt-2">
                  <div className="text-sm font-semibold">{it.scholarshipName}</div>
                  <div className="text-sm text-base-content/70">{it.subjectCategory}</div>
                  <div className="text-xs flex gap-2 mt-1 text-base-content/60">Fees: ${it.applicationFees}  <p className="text-green-600">{it.paymentStatus}</p></div>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className={"inline-block px-2 py-1 rounded text-xs " + (it.applicationStatus === "completed" ? "bg-green-100 text-green-700" : it.applicationStatus === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}>
                  {it.applicationStatus}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => openDetails(it)}
                className=" btn py-1 rounded bg-base-300 text-sm flex items-center justify-center gap-2"
              >
                <FaInfoCircle /> Details
              </button>

              {it.applicationStatus === "pending" && (
                <>
                  <button
                    onClick={() => openEdit(it)}
                    className=" btn py-1 rounded bg-green-600 text-white text-sm flex items-center justify-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => (it.paymentStatus === "Unpaid" && payNow(it.id))}
                    className=" btn py-1 rounded bg-blue-500 text-white text-sm flex items-center justify-center gap-2"
                  >
                     {it.paymentStatus === "Unpaid" ? <><FaCreditCard />Pay</> : <p>PAID</p>}
                  </button>

                  <button
                    onClick={() => deleteApp(it.id)}
                    className=" btn py-1 rounded bg-red-400 text-white text-sm flex items-center justify-center gap-2"
                  >
                    <FaTrash /> Delete
                  </button>
                </>
              )}

              {it.applicationStatus === "completed" && (
                <button
                  onClick={() => openReview(it)}
                  className="px-2 py-1 rounded bg-pink-500 text-white text-sm flex items-center justify-center gap-2"
                >
                  <FaStar />Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {detailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeDetails} />
          <div className="relative w-full max-w-2xl bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-3">Application Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-base-content/70">University</div>
                <div className="font-medium">{detailsModal.universityName}</div>
                <div className="text-sm">{detailsModal.universityAddress}</div>

                <div className="text-sm mt-2 text-base-content/70">Applied On</div>
                <div className="text-sm">{detailsModal.appliedOn}</div>
              </div>

              <div>
                <div className="text-sm text-base-content/70">Scholarship</div>
                <div className="font-medium">{detailsModal.scholarshipName}</div>
                <div className="text-sm">{detailsModal.subjectCategory}</div>

                <div className="text-sm mt-2 text-base-content/70">Fees & Payment</div>
                <div className="text-sm">${detailsModal.applicationFees} • {detailsModal.paymentStatus}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm text-base-content/70">Moderator Feedback</div>
                <div className="mt-2 text-sm">{detailsModal.feedback || "—"}</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-sm text-base-content/70">Full details</div>
                <div className="mt-2 text-sm">{detailsModal.details}</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeDetails} className="px-3 py-2 rounded bg-base-200">Close</button>
            </div>
          </div>
        </div>
      )}

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />
          <div className="relative w-full max-w-lg bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-3">Edit Application</h4>

            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-base-content/70">University</label>
              <input className="w-full px-3 py-2 rounded bg-base-200" value={editModal.universityName} onChange={(e)=> setEditModal(p => ({...p, universityName: e.target.value}))} />

              <label className="text-sm text-base-content/70">University Address</label>
              <input className="w-full px-3 py-2 rounded bg-base-200" value={editModal.universityAddress} onChange={(e)=> setEditModal(p => ({...p, universityAddress: e.target.value}))} />

              <label className="text-sm text-base-content/70">Scholarship</label>
              <input className="w-full px-3 py-2 rounded bg-base-200" value={editModal.scholarshipName} onChange={(e)=> setEditModal(p => ({...p, scholarshipName: e.target.value}))} />
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeEdit} className="px-3 py-2 rounded bg-base-200">Cancel</button>
              <button onClick={saveEdit} className="px-3 py-2 rounded bg-green-500 text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeReview} />
          <div className="relative w-full max-w-md bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-3">Add Review</h4>

            <div className="mb-3">
              <div className="text-sm text-base-content/70 mb-2">Your Rating</div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((n)=> (
                  <button
                    key={n}
                    onClick={()=> setReviewRating(n)}
                    className={`p-2 rounded ${reviewRating >= n ? "bg-yellow-400 text-white" : "bg-base-200 text-base-content/70"}`}
                    aria-label={`Rate ${n} stars`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-base-content/70">Comment</label>
              <textarea value={reviewText} onChange={(e)=> setReviewText(e.target.value)} rows={5} className="w-full px-3 py-2 rounded bg-base-200" />
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeReview} className="px-3 py-2 rounded bg-base-200">Cancel</button>
              <button onClick={submitReview} className="px-3 py-2 rounded bg-green-500 text-white">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
