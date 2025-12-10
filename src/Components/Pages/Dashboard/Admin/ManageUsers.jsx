import React, { useState } from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";


const ManageUsers = ({ initial = [], onChange = () => {} }) =>{

  const defaultUsers = initial.length
    ? initial
    : [
        { id: "u1", name: "Aisha Rahman", email: "aisha@example.com", role: "Admin" },
        { id: "u2", name: "Rafi Ahmed", email: "rafi@example.com", role: "Moderator" },
        { id: "u3", name: "Sadia Khan", email: "sadia@example.com", role: "Student" },
        { id: "u4", name: "Tariq Ali", email: "tariq@example.com", role: "Student" },
      ];

  const [users, setUsers] = useState(defaultUsers);
  const [filterRole, setFilterRole] = useState("All");
  const [editing, setEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const roles = ["Student", "Moderator", "Admin"];

  const visible = users.filter((u) => (filterRole === "All" ? true : u.role === filterRole));

  const openEdit = (u) => {
    setSelectedUser({ ...u });
    setEditing(true);
  }

  const closeEdit = () => {
    setSelectedUser(null);
    setEditing(false);
  }

  const saveRole = () => {
    if (!selectedUser) return;
    setUsers((prev) =>  {
      const next = prev.map((p) => (p.id === selectedUser.id ? selectedUser : p));
      onChange(next);
      return next;
    });
    closeEdit();
  }

  const deleteUser = (id) => {
    if (!confirm("Delete this user? This action cannot be undone.")) return;
    setUsers((prev) => {
      const next = prev.filter((p) => p.id !== id);
      onChange(next);
      return next;
    });
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold">Manage Users</h3>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="select select-bordered select-sm bg-base-200">
            <option>All</option>
            <option>Student</option>
            <option>Moderator</option>
            <option>Admin</option>
          </select>
          <div className="ml-auto md:ml-0 text-sm text-base-content/60">Showing {visible.length} users</div>
        </div>
      </div>


      <div className="hidden md:block">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-sm text-base-content/60 py-6">No users found</td>
              </tr>
            )}

            {visible.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="font-medium">{u.name}</div>
                </td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(u)} className="btn btn-sm bg-green-500 hover:bg-green-600 text-white">
                      <FaUserEdit /> <span className="ml-2">Change Role</span>
                    </button>
                    <button onClick={() => deleteUser(u.id)} className="btn btn-sm bg-red-100 text-red-700 hover:bg-red-200">
                      <FaTrash /> <span className="ml-2">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {visible.length === 0 && <div className="text-sm text-base-content/60">No users found</div>}
        {visible.map((u) => (
          <div key={u.id} className="p-3 rounded-lg bg-base-200 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.name}</div>
              <div className="text-sm text-base-content/70">{u.email}</div>
              <div className="text-xs mt-1">Role: <span className="font-medium">{u.role}</span></div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button onClick={() => openEdit(u)} className="px-3 py-1 rounded bg-green-500 text-white text-sm">Change Role</button>
              <button onClick={() => deleteUser(u.id)} className="px-3 py-1 rounded bg-red-100 text-red-700 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>


      {editing && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />

          <div className="relative w-full max-w-md bg-base-100 p-4 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-3">Change Role</h4>

            <div>
              <label className="text-sm text-base-content/70">User</label>
              <div className="font-medium mb-2">{selectedUser.name}</div>

              <label className="text-sm text-base-content/70">Role</label>
              <select value={selectedUser.role} onChange={(e) => setSelectedUser((p) => ({ ...p, role: e.target.value }))} className="w-full px-3 py-2 rounded border bg-base-200">
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={closeEdit} className="px-3 py-2 rounded bg-base-200">Cancel</button>
              <button onClick={saveRole} className="px-3 py-2 rounded bg-green-500 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;