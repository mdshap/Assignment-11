import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageScholarships = ({
  initial = [],
  onChange = () => {},
}) => {

  const dummy = [
    {
      id: "sch1",
      name: "Global Excellence Scholarship",
      university: "Harvard University",
      country: "USA",
      city: "Cambridge",
      degree: "Bachelors",
      subjectCategory: "Computer Science",
      scholarshipCategory: "Full Funded",
      applicationFees: "50",
      serviceCharge: "100",
      deadline: "2025-02-10",
      image: "https://via.placeholder.com/120x80"
    },
    {
      id: "sch2",
      name: "International Merit Award",
      university: "University of Toronto",
      country: "Canada",
      city: "Toronto",
      degree: "Masters",
      subjectCategory: "Engineering",
      scholarshipCategory: "Semi Funded",
      applicationFees: "0",
      serviceCharge: "120",
      deadline: "2025-01-20",
      image: "https://via.placeholder.com/120x80"
    },
    {
      id: "sch3",
      name: "Asian Scholars Grant",
      university: "University of Tokyo",
      country: "Japan",
      city: "Tokyo",
      degree: "PhD",
      subjectCategory: "Physics",
      scholarshipCategory: "Full Funded",
      applicationFees: "30",
      serviceCharge: "90",
      deadline: "2025-03-15",
      image: "https://via.placeholder.com/120x80"
    }
  ];

  const [list, setList] = useState(initial.length ? initial : dummy);
  const [editing, setEditing] = useState(false);
  const [editingSch, setEditingSch] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = list.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (s.name || "").toLowerCase().includes(q) ||
      (s.university || "").toLowerCase().includes(q)
    );
  });

  const openEdit = (sch) => {
    setEditingSch({ ...sch });
    setEditing(true);
  };

  const closeEdit = () => {
    setEditingSch(null);
    setEditing(false);
  };

  const saveEdit = () => {
    if (!editingSch?.name?.trim()) return alert("Scholarship name is required");
    if (!editingSch?.university?.trim()) return alert("University is required");

    setList((prev) => {
      const next = prev.map((p) =>
        p.id === editingSch.id ? editingSch : p
      );
      onChange(next);
      return next;
    });

    closeEdit();
  };

  const confirmDelete = (id) => {
    const ok = confirm("Are you sure you want to delete this scholarship?");
    if (!ok) return;
    setList((prev) => {
      const next = prev.filter((p) => p.id !== id);
      onChange(next);
      return next;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">Manage Scholarships</h3>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or university..."
            className="input input-sm w-full md:w-80 bg-base-200"
          />
        </div>
      </div>


      <div className="hidden lg:block">
        <table className="table w-full">
          <thead>
            <tr className="text-center">
              <th>Preview</th>
              <th>Name</th>
              <th>University</th>
              <th className="">Degree</th>
              <th>Deadline</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-sm text-base-content/60 py-6">
                  No scholarships found
                </td>
              </tr>
            )}

            {filtered.map((s) => (
              <tr key={s.id} className="align-top">
                <td className="w-24">
                  <img
                    src={s.image || "https://via.placeholder.com/120x80"}
                    alt={s.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-base-content/60">{s.subjectCategory}</div>
                </td>
                <td><p className="text-center">{s.university}</p> <p className="text-center">{s.country}</p></td>
                <td className="">{s.degree}</td>
                <td>{s.deadline || "-"}</td>
                <td className="text-right">
                  <div className="grid justify-end gap-2">
                    <button
                      onClick={() => openEdit(s)}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
                    >
                      <FaEdit /> <span className="ml-2">Update</span>
                    </button>
                    <button
                      onClick={() => confirmDelete(s.id)}
                      className="btn btn-sm bg-red-400 text-white "
                    >
                      <FaTrash /> <span className="ml-2">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden space-y-3">
        {filtered.length === 0 && (
          <div className="text-sm text-base-content/60">No scholarships found</div>
        )}

        {filtered.map((s) => (
          <div className="flex gap-3 p-2 rounded-lg bg-base-200 justify-between">
          <div
            key={s.id}
            className=" w-full flex justify-between gap-3"
          >
            <div><img
              src={s.image || "https://via.placeholder.com/80x50"}
              alt={s.name}
              className="w-20 h-12 object-cover rounded"
            /></div>
            
              <div className="font-medium text-sm sm:text-md"><p>{s.name}</p> <p className="text-sm font-normal text-gray-500 sm:text-center">{s.subjectCategory}</p></div>
              <div className="text-sm text-base-content/70">
                <p className="text-green-600 text-center">{s.university}</p> <p className="text-blue-500 text-center">{s.country} </p> <p className=" text-center">{s.degree}</p>
              </div>
             </div>

              <div className="mt-2 grid gap-2">
                <button
                  onClick={() => openEdit(s)}
                  className="px-3 py-1 rounded bg-green-500 text-white text-sm"
                >
                  <div className="flex items-center gap-2">
                    <FaEdit /> <p className="hidden sm:block">Update</p></div>
                </button>
                <button
                  onClick={() => confirmDelete(s.id)}
                  className="px-3 py-1 rounded bg-red-400 flex items-center gap-2 text-white text-sm"
                >
                  <FaTrash /> <p className="hidden sm:block">Delete</p>
                </button>
              </div>
            </div>
        ))}
      </div>

      {/* Modal */}
      {editing && editingSch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeEdit}
          />

          <div className="relative w-full max-w-2xl bg-base-100 p-4 rounded-2xl shadow max-h-[80vh] overflow-auto">
            <h4 className="text-lg font-semibold mb-4">Update Scholarship</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-base-content/70">Name</label>
                <input
                  value={editingSch.name}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">University</label>
                <input
                  value={editingSch.university}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, university: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">Country</label>
                <input
                  value={editingSch.country}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, country: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>  
                <label className="text-sm text-base-content/70">City</label>
                <input
                  value={editingSch.city}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, city: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div>
                <label className="text-sm text-base-content/70">Degree</label>
                <select
                  value={editingSch.degree}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, degree: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                >
                  <option value="">Select</option>
                  <option>Bachelors</option>
                  <option>Masters</option>
                  <option>PhD</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-base-content/70">Deadline</label>
                <input
                  type="date"
                  value={editingSch.deadline}
                  onChange={(e) =>
                    setEditingSch((p) => ({ ...p, deadline: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-base-content/70">Subject Category</label>
                <input
                  value={editingSch.subjectCategory}
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
                  value={editingSch.scholarshipCategory}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      scholarshipCategory: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                >
                  <option value="">Select</option>
                  <option>Full Funded</option>
                  <option>Semi Funded</option>
                  <option>Merit-based</option>
                  <option>Need-based</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-base-content/70">
                  Application Fees
                </label>
                <input
                  value={editingSch.applicationFees}
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
                  value={editingSch.serviceCharge}
                  onChange={(e) =>
                    setEditingSch((p) => ({
                      ...p,
                      serviceCharge: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded border bg-base-200"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeEdit} className="px-3 py-2 rounded bg-base-200">
                Cancel
              </button>
              <button onClick={saveEdit} className="px-3 py-2 rounded bg-green-500 text-white">
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
