import React, { use, useState } from "react";
import { FaEnvelope, FaUser, FaCopy } from "react-icons/fa";
import { AuthContext } from "../../../Authentication/AuthContext";
import axios from "axios";
import axiosProvider from "../../../API/axiosProvider";
import toast from "react-hot-toast";

const Profile = () => {
  const { userFromDb } = use(AuthContext);

  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState(userFromDb?.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleSaveProfile = async () => {
    try {
      setUploading(true);
      let photoURL = userFromDb.photoURL;

      // upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
          formData
        );

        photoURL = imgRes.data.data.display_url;
      }

      await axiosProvider.patch(`/users/profile/${userFromDb._id}`, {
        name,
        photoURL,
      });

      toast.success("Profile updated successfully");
      setEditModal(false);
      window.location.reload();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen   flex mx-auto items-center  p-2 sm:p-6">
      <div className="bg-base-100">
        <div className=" max-w-[700px] min-w-[300px] sm:min-w-[550px] md:min-w-[520px] lg:min-w-[700px] backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10  w-full">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center flex-col md:flex-row gap-10 ">
              <div className=" w-30 h-30 md:w-40 md:h-40 rounded-xl overflow-hidden bg-linear-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-3xl">
                {userFromDb?.photoURL ? (
                  <img
                    src={userFromDb?.photoURL}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <FaUser className="text-4xl opacity-80" />
                    <span className="mt-2 text-sm opacity-90">
                      {userFromDb?.name.split(" ")[0]}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-lg md:text-3xl font-bold text-black">
                  {userFromDb?.name}
                </h2>
                <p className="mt-2 text-green-700 bg-green-300 inline-block px-3 py-1 rounded-full text-sm">
                  {userFromDb?.role}
                </p>
                <p className="text-gray-700 mt-4 text-sm md:text-lg max-w-xl">
                  {userFromDb?.bio}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <div className="w-full gap-3 p-3 rounded-lg bg-base-300">
                  <div>
                    <div className="text-sm flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                      {" "}
                      <FaEnvelope className="" /> <p>Email</p>{" "}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700 break-all">
                        {userFromDb?.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 p-3 rounded-lg bg-base-300">
                  <div>
                    <div className="text-sm flex gap-2 items-center justify-center text-gray-600">
                      <FaUser className="text-gray-600 text-sm" />{" "}
                      <p className="text-center">Role</p>
                    </div>
                    <div className="font-medium text-green-600 text-center text-sm">
                      {userFromDb?.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setEditModal(true)}
              className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setEditModal(false)}
          />

          <div className="relative w-full max-w-md bg-base-100 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>

            {/* NAME */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded bg-base-200"
              />
            </div>

            {/* IMAGE */}
            <div className="mb-4">
              <label className="text-sm text-gray-600">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full mt-1 text-sm"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded bg-base-200">
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                disabled={uploading}
                className="px-4 py-2 rounded bg-green-600 text-white">
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
