import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosProvider from "../../../../API/axiosProvider";
import toast from "react-hot-toast";

const ManageScholarships = () => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editingSch, setEditingSch] = useState(null);

  useEffect(() => {
    axiosProvider.get("/scholarships").then((res) => {
      setList(res.data || []);
    });
  }, []);

  const openEdit = (sch) => {
    setEditingSch(sch);
    setEditing(true);
  };

  const closeEdit = () => {
    setEditingSch(null);
    setEditing(false);
  };

  const saveEdit = async () => {
    if (!editingSch?.scholarshipName?.trim())
      return toast.error("Scholarship name is required");

    if (!editingSch?.universityName?.trim())
      return toast.error("University is required");

    const scholarshipInfo = {
      scholarshipName: editingSch.scholarshipName,
      universityName: editingSch.universityName,
      universityImage: editingSch.universityImage,
      universityCountry: editingSch.universityCountry,
      universityCity: editingSch.universityCity,
      universityWorldRank: editingSch.universityWorldRank,
      subjectCategory: editingSch.subjectCategory,
      scholarshipCategory: editingSch.scholarshipCategory,
      degree: editingSch.degree,
      applicationFees: editingSch.applicationFees,
      serviceCharge: editingSch.serviceCharge,
      applicationDeadline: editingSch.applicationDeadline,
      scholarshipPostDate: editingSch.scholarshipPostDate,
      postedUserEmail: editingSch.postedUserEmail,
    };

    try {
      await axiosProvider.patch(
        `/scholarships/${editingSch._id}`,
        scholarshipInfo
      );

      setList((prev) =>
        prev.map((item) =>
          item._id === editingSch._id ? { ...item, ...scholarshipInfo } : item
        )
      );
      toast.success("Updated Successfully");
      closeEdit();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update scholarship");
    }
  };

  const confirmDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this scholarship?");
    if (!ok) return;

    try {
      await axiosProvider.delete(`/scholarships/${id}`);

      setList((prev) => prev.filter((p) => p._id !== id));

      toast.success("Successfully Deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete scholarship");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="mb-4 md:hidden">
        <h3 className="text-lg font-semibold text-center text-green-600">
          Manage Scholarships
        </h3>
      </div>

      <div className="hidden lg:block">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>Preview</th>
              <th>Name</th>
              <th>University</th>
              <th>Degree</th>
              <th>Deadline</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  No scholarships found
                </td>
              </tr>
            )}

            {list.map((s) => (
              <tr key={s._id}>
                <td className="w-24">
                  <img
                    src={
                      s.universityImage || "https://via.placeholder.com/120x80"
                    }
                    alt={s.universityName}
                    className="w-26 h-14 object-cover rounded"
                  />
                </td>
                <td className="text-center">
                  <div className="font-medium">{s.scholarshipName}</div>
                  <div className="text-sm text-base-content/60">
                    {s.subjectCategory}
                  </div>
                </td>
                <td className="text-center">
                  <p className="text-green-600">{s.universityName}</p>
                  <p className="text-blue-500">{s.universityCountry}</p>
                </td>
                <td>
                  <p className="text-xs mx-auto bg-blue-500 text-center text-white rounded-xl mt-2 px-1 py-1">
                    {s.degree}
                  </p>
                </td>
                <td className="text-red-700 text-center">
                  {s.applicationDeadline || "-"}
                </td>
                <td className="text-right">
                  <div className="grid justify-end gap-2">
                    <button
                      onClick={() => openEdit(s)}
                      className="btn btn-sm bg-green-500 text-white">
                      <FaEdit /> <span className="ml-2">Update</span>
                    </button>
                    <button
                      onClick={() => confirmDelete(s._id)}
                      className="btn btn-sm bg-red-400 text-white">
                      <FaTrash /> <span className="ml-2">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden space-y-3">
        {list.length === 0 && (
          <div className="text-sm text-base-content/60">
            No scholarships found
          </div>
        )}

        {list.map((s) => (
          <div
            key={s._id}
            className="flex gap-3 p-2 rounded-lg bg-base-200 justify-between">
            <div>
              <img
                src={s.universityImage || "https://via.placeholder.com/80x50"}
                alt={s.universityName}
                className="w-20 h-13 object-cover rounded"
              />
              <p className="text-xs mx-auto bg-blue-500 py-0.5 text-center text-white rounded-xl mt-2">
                {s.degree}
              </p>
            </div>

            <div className="flex-1">
              <p className="font-medium text-sm">{s.scholarshipName}</p>
              <p className="text-xs text-gray-500">{s.subjectCategory}</p>
              <p className="text-xs text-green-600">{s.universityName}</p>
              <p className="text-xs text-red-600">
                Deadline: {s.applicationDeadline}
              </p>
            </div>

            <div className="grid gap-2">
              <button
                onClick={() => openEdit(s)}
                className="px-2 py-1 flex items-center gap-2 rounded bg-green-500 text-white text-xs">
                <FaEdit /> <p className="hidden sm:block">Update</p>
              </button>
              <button
                onClick={() => confirmDelete(s._id)}
                className="px-2 py-1 flex items-center gap-2 rounded bg-red-400 text-white text-xs">
                <FaTrash /> <p className="hidden sm:block">Delete</p>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editing && editingSch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />

          <div className="relative w-full max-w-2xl bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-4">Update Scholarship</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-base-content/70">
                  Scholarship Name
                </label>
                <input
                  value={editingSch.scholarshipName || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      scholarshipName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">
                  University Name
                </label>
                <input
                  value={editingSch.universityName || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      universityName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">Country</label>
                <input
                  value={editingSch.universityCountry || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      universityCountry: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">City</label>
                <input
                  value={editingSch.universityCity || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      universityCity: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">
                  World Rank
                </label>
                <input
                  type="number"
                  value={editingSch.universityWorldRank || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      universityWorldRank: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">Degree</label>
                <select
                  value={editingSch.degree || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, degree: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200">
                  <option value="">Select Degree</option>
                  <option>Bachelor</option>
                  <option>Masters</option>
                  <option>PhD</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-base-content/70">
                  Subject Category
                </label>
                <input
                  defaultValue={editingSch.subjectCategory || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      subjectCategory: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-base-content/70">
                  Scholarship Category
                </label>
                <select
                  defaultValue={editingSch.scholarshipCategory || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      scholarshipCategory: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200">
                  <option value="">Select Category</option>
                  <option>Full fund</option>
                  <option>Partial</option>
                  <option>Self-fund</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-base-content/70">
                  Application Fees
                </label>
                <input
                  type="number"
                  value={editingSch.applicationFees || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      applicationFees: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-base-content/70">
                  Service Charge
                </label>
                <input
                  type="number"
                  value={editingSch.serviceCharge || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      serviceCharge: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={editingSch.applicationDeadline || ""}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      applicationDeadline: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={closeEdit}
                className="px-3 py-2 rounded bg-base-200">
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-3 py-2 rounded bg-green-500 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
