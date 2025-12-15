import React from "react";
import { MdOutlineSettingsApplications, MdReviews } from "react-icons/md";
import { NavLink } from "react-router";

const ModeratorSidebar = ({ collapsed }) => {
  const itemClass = collapsed
    ? "flex items-center justify-center gap-2  min-w-0"
    : "flex items-center gap-2 pl-4 min-w-0";

  return (
    <div>
      <li>
        <NavLink to="manage-applications" className={itemClass}>
          <MdOutlineSettingsApplications className="text-2xl" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>
            Manage Applications
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="manage-reviews" className={itemClass}>
          <MdReviews className="text-2xl" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>
            Manage Reviews
          </span>
        </NavLink>
      </li>
    </div>
  );
};

export default ModeratorSidebar;
