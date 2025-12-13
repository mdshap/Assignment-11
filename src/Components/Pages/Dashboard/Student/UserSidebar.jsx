import React from "react";
import { FaStar } from "react-icons/fa";
import { VscGitStashApply } from "react-icons/vsc";
import { NavLink } from "react-router";

const UserSidebar = ({ collapsed }) => {
  const itemClass = collapsed
    ? "flex items-center justify-center gap-2  min-w-0"
    : "flex items-center gap-2 pl-4 min-w-0";
  return (
    <div>
      <li>
        <NavLink to="my-applications" className={itemClass}>
          <VscGitStashApply className="text-xl" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>
            My Applications
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="my-reviews" className={itemClass}>
          <FaStar className="text-xl" />
          <span className={`${collapsed ? "hidden" : "inline"}`}>
            My Reviews
          </span>
        </NavLink>
      </li>
    </div>
  );
};

export default UserSidebar;
