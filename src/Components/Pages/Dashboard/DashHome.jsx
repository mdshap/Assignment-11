import React, { use } from "react";
import { AuthContext } from "../../../Authentication/AuthContext";

const DashHome = () => {
  const { userFromDb } = use(AuthContext)
  const role = userFromDb.role;

  const roleText =
    role === "Admin" ? "Admin" : role === "Moderator" ? "Moderator" : "Student";

  const roleSubtitle =
    role === "Admin"
      ? "Manage scholarships, users, and platform insights"
      : role === "Moderator"
      ? "Review applications and support students"
      : "Track your applications and explore opportunities";

  return (
    <div className="min-h-[70vh] mx-auto flex items-center justify-center px-4 ">
      <div className="text-center max-w-xl w-full bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome back, <span className="text-green-500">{roleText}</span>
        </h1>

        <p className="text-base md:text-lg text-base-content/70 mb-6">
          {roleSubtitle}
        </p>

        <div className="flex justify-center gap-3">
          <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            Scholar Stream Dashboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
