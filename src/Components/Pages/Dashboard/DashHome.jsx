import React from "react";

const DashHome = () => {
  const role = "admin";

  const roleText =
    role === "admin"
      ? "Admin"
      : role === "moderator"
      ? "Moderator"
      : "Student";

  const roleSubtitle =
    role === "admin"
      ? "Manage scholarships, users, and platform insights"
      : role === "moderator"
      ? "Review applications and support students"
      : "Track your applications and explore opportunities";

  return (
    <div className="min-h-[70vh] mx-auto flex items-center justify-center px-4">
      <div className="text-center max-w-xl w-full bg-base-100 rounded-2xl shadow-lg p-8 border border-base-300">

        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome back,{" "}
          <span className="text-green-500">{roleText}</span>
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
