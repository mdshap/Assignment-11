import React, { use, useEffect, useState } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoHomeOutline, IoSchool } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdManageAccounts, MdOutlineManageHistory } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import AdminSidebar from "./Admin/AdminSidebar";
import ModeratorSidebar from "./Moderator/ModeratorSidebar";
import UserSidebar from "./Student/UserSidebar";
import { AuthContext } from "../../../Authentication/AuthContext";

const DashSidebar = () => {
  const { userFromDb, signOutUser } = use(AuthContext);
  const role = userFromDb?.role;
  console.log(role);

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handle = () => {
      if (mq.matches) setCollapsed(false);
      else setCollapsed(true);
    };
    handle();
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);
  const sidebarWidthClass = collapsed ? "w-14" : "w-51";

  return (
    <div className="dash-active min-h-screen max-h-screen sticky top-0 left-0 bottom-0 z-30 flex ">
      <aside
        className={`box-border bg-base-200 shadow-lg border-r border-base-300 transition-[width] duration-200 ease-in-out ${sidebarWidthClass} flex flex-col overflow-x-hidden `}
        aria-expanded={!collapsed}>
        <div
          className={`flex items-center border-b border-base-300 gap-2 py-3 bg-linear-to-br to-green-200  ${
            collapsed ? "justify-center px-2" : "px-3"
          }`}>
          <a
            className={`flex items-center gap-2 ${
              collapsed ? "justify-center " : ""
            }`}
            href="/">
            <IoSchool className="text-green-600 text-xl" />
            <span
              className={`${
                collapsed ? "hidden" : "inline"
              } font-bold text-lg truncate `}>
              Scholar <span className="text-green-600">Stream</span>
            </span>
          </a>
        </div>

        <nav className="flex-1 mt-7 overflow-auto">
          <ul className={`menu p-0 ${collapsed ? "w-full" : "w-50"}`}>
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 ${
                  collapsed ? " justify-center" : "pl-4"
                } min-w-0`}>
                <IoHomeOutline className="text-xl" />
                <span
                  className={`${
                    collapsed ? "hidden" : "inline"
                  } truncate min-w-0`}>
                  Go Back to Home
                </span>
              </Link>
            </li>

            <li>
              <NavLink
                to="profile"
                className={`flex items-center gap-2 ${
                  collapsed ? " justify-center" : "pl-4"
                } min-w-0`}>
                <CgProfile className="text-xl" />
                <span
                  className={`${
                    collapsed ? "hidden" : "inline"
                  } truncate min-w-0`}>
                  My Profile
                </span>
              </NavLink>
            </li>

            <hr className="text-gray-400 font-extrabold mt-7 mb-3" />
            {role === "Admin" ? (
              <AdminSidebar collapsed={collapsed} />
            ) : role === "Moderator" ? (
              <ModeratorSidebar collapsed={collapsed} />
            ) : role === "User" ? (
              <UserSidebar collapsed={collapsed} />
            ) : (
              ""
            )}
          </ul>
        </nav>

        <div className={`py-3 ${collapsed ? "text-center px-2" : "px-3"}`}>
          <button
            onClick={() => {
              if (!confirm("Do you want to Logout?")) return;
              signOutUser();
            }}
            className={`btn btn-sm btn-outline ${collapsed ? "" : "w-full"}`}>
            <div className={`${collapsed ? "hidden" : "flex gap-2"}`}>
              <p className="text-md">Logout</p> <LuLogOut className="text-lg" />
            </div>

            {collapsed && <LuLogOut className="text-md" />}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DashSidebar;
