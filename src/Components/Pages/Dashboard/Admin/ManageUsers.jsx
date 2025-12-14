import React, { useEffect, useState } from "react";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import axiosProvider from "../../../../API/axiosProvider";
import toast from "react-hot-toast";

const roles = ["User", "Moderator", "Admin"];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axiosProvider.get("/users").then((res) => {
      setUsers(res.data || []);
    });
  }, []);

  const openEdit = (user) => {
    setEditingUser(user);
  };

  const closeEdit = () => {
    setEditingUser(null);
  };

  const saveRole = async () => {
    await axiosProvider.patch(`/users/${editingUser.email}`, {
      role: editingUser.role,
    });

    const updatedUsers = users.map((u) => {
      if (u.email === editingUser.email) {
        return { ...u, role: editingUser.role };
      }
      return u;
    });

    setUsers(updatedUsers);
    toast.success("Changed Role Successfully");
    closeEdit();
  };

  const deleteUser = async (email) => {
    try {
      await axiosProvider.delete(`/users/${email}`);

      const remainingUsers = users.filter((u) => u.email !== email);
      setUsers(remainingUsers);

      toast.success("Successfully Deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-base-100 rounded-2xl p-4 shadow">
      <div className=" md:hidden mb-4">
        <h3 className="text-lg font-semibold text-center text-green-600">Manage Users</h3>
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
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-sm text-base-content/60 py-6">
                  No users found
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u._id}>
                <td className="font-medium text-pink-600">{u.name}</td>
                <td>{u.email}</td>
                <td className="text-green-600">{u.role}</td>
                <td className="text-right">
                  <div className="grid lg:grid-cols-2 justify-end gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white">
                      <FaUserEdit /> <span className="ml-2">Change Role</span>
                    </button>
                    <button
                      onClick={() => deleteUser(u.email)}
                      className="btn btn-sm bg-red-400 text-white hover:bg-red-200">
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
      <div className="md:hidden space-y-3">
        {users.length === 0 && (
          <div className="text-sm text-base-content/60">No users found</div>
        )}

        {users.map((u) => (
          <div
            key={u._id}
            className="p-3 rounded-lg bg-base-200 flex items-center justify-between">
            <div>
              <div className="font-medium text-sm sm:text-md text-pink-600">
                {u.name}
              </div>
              <div className="text-[12px] max-w-28 text-base-content/70">
                {u.email}
              </div>
              <div className="text-xs mt-1">
                Role:{" "}
                <span className="font-medium text-green-600">{u.role}</span>
              </div>
            </div>

            <div className="grid gap-2">
              <button
                onClick={() => openEdit(u)}
                className="px-3 py-1 rounded bg-green-500 text-white text-sm flex items-center gap-2">
                <FaUserEdit /> <p className="hidden sm:block">Change</p>
              </button>
              <button
                onClick={() => deleteUser(u.email)}
                className="px-3 py-1 rounded bg-red-400 text-white text-sm flex items-center gap-1">
                <FaTrash /> <p className="hidden sm:block">Delete</p>
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEdit} />

          <div className="relative w-full max-w-md bg-base-100 p-4 rounded-2xl shadow">
            <h4 className="text-lg font-semibold mb-3">Change Role</h4>

            <div>
              <label className="text-sm text-base-content/70">User</label>
              <div className="font-medium mb-2">{editingUser.name}</div>

              <label className="text-sm text-base-content/70">Role</label>
              <select
                value={editingUser.role}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    role: e.target.value,
                  })
                }
                className="w-full px-3 py-2 rounded border bg-base-200">
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                onClick={closeEdit}
                className="px-3 py-2 rounded bg-base-200">
                Cancel
              </button>
              <button
                onClick={saveRole}
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

export default ManageUsers;
