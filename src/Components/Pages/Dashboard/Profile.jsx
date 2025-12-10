import React, { useState, useRef, use } from "react";
import { FaEnvelope, FaUser, FaCopy } from "react-icons/fa";
import { AuthContext } from "../../../Authentication/AuthContext";


const Profile = () => {
  const API_KEY = "3de4075d171467fb67c68c77755853ba";

  const initial = {
    id: "u123",
    name: "Aisha Rahman",
    email: "aisha.rahman@example.com",
    role: "Admin",
    bio: "Passionate about scholarship programs and student success.",
    avatar: null,
  };

  const {user} = use(AuthContext)

  const [profile, setProfile] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(initial);
  const [avatarPreview, setAvatarPreview] = useState(initial.avatar);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const validEmail = (s) => /\S+@\S+\.\S+/.test(s || "");

  function openEdit() {
    setForm(profile);
    setAvatarPreview(profile.avatar || null);
    setEditing(true);
  }

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", f);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const url = data?.data?.url;

      if (!url) throw new Error("No URL returned from ImgBB");

      setAvatarPreview(url);
      setForm((prev) => ({ ...prev, avatar: url }));
    } catch (err) {
      console.error("ImgBB error:", err);
      alert("Image upload failed");
    }

    setUploading(false);
  }

  function removeAvatar() {
    setAvatarPreview(null);
    setForm((prev) => ({ ...prev, avatar: null }));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function saveChanges() {
    if (!form.name?.trim()) return alert("Name is required");
    if (!validEmail(form.email)) return alert("Enter a valid email");

    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));

    setProfile({ ...form, avatar: avatarPreview });
    setSaving(false);
    setEditing(false);
  }

  return (
    <div className="min-h-screen max-h-screen  flex mx-auto items-center  p-2 sm:p-6">
    <div className="">
      <div className=" max-w-[700px] backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/10  w-full">
        <div className="flex flex-col items-center gap-6">

          <div className="flex items-center flex-col md:flex-row gap-10 ">
          <div className="w-40 h-40 rounded-xl overflow-hidden bg-linear-to-br from-green-600 to-green-400 flex items-center justify-center text-white text-3xl">
            {user?.photoURL ? (
              <img src={user?.photoURL} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center">
                <FaUser className="text-4xl opacity-80" />
                <span className="mt-2 text-sm opacity-90">{profile.name.split(" ")[0]}</span>
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-black">{profile.name}</h2>
              <p className="mt-2 text-green-700 bg-green-300 inline-block px-3 py-1 rounded-full text-sm">{profile.role}</p>
              <p className="text-gray-700 mt-4 max-w-xl">{profile.bio}</p>
            </div>
            </div>
     
          <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            

       
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="w-full gap-3 p-3 rounded-lg bg-base-300">
                
                <div>
                  <div className="text-sm flex items-center gap-2 text-gray-600"> <FaEnvelope className="" /> <p>Email</p> </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 break-all">{profile.email}</span>
                    
                  </div>
                </div>
              </div>

              <div className="w-full gap-3 p-3 rounded-lg bg-base-300">
                
                <div>
                  <div className="text-sm flex gap-2 items-center text-gray-600"><FaUser className="text-gray-600" /> <p>Role</p></div>
                  <div className="font-medium text-green-600">{profile.role}</div>
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={openEdit}
            className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow"
          >
            Edit Profile
          </button>
        </div>
      </div>
      </div>

  
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(false)} />

          <div className="relative max-w-xl w-full bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow max-h-[80vh] overflow-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Update Profile</h3>

        
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-36 h-36 rounded-xl overflow-hidden bg-gray-800">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-300 flex items-center justify-center h-full">No photo</div>
                )}
              </div>

              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" id="avatar-file" />
              <label htmlFor="avatar-file" className="bg-white text-green-600 px-4 py-1 rounded cursor-pointer">
                {uploading ? "Uploading..." : "Upload"}
              </label>
              {avatarPreview && (
                <button onClick={removeAvatar} className="text-red-400 text-sm hover:text-red-500">Remove</button>
              )}
            </div>

    
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm text-gray-300">Full Name</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded bg-white/10 text-white" />

              <label className="text-sm text-gray-300">Email</label>
              <input disabled value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="w-full px-3 py-2 rounded bg-white/10 text-white" />

              

              <label className="text-sm text-gray-300">Short Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} className="w-full px-3 py-2 rounded bg-white/10 text-white" rows={3} />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setEditing(false)} className="px-4 py-2 rounded bg-white/10 text-white">Cancel</button>
              <button onClick={saveChanges} disabled={saving} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">{saving ? "Saving..." : "Save changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default  Profile;
