import React, { useEffect, useState } from "react";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoHomeOutline, IoSchool } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { MdManageAccounts, MdOutlineManageHistory } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link, NavLink } from "react-router";


const DashSidebar = () => {

  const [collapsed, setCollapsed] = useState(true);;

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


  const sidebarWidthClass = collapsed ? "w-14" : "w-64";

  return (
    <div className=" min-h-screen max-h-screen sticky top-0 left-0 bottom-0 z-30 flex">
      <aside
        className={`bg-base-200 shadow-lg border-r border-base-300 transition-[width] duration-200 ease-in-out ${sidebarWidthClass} flex flex-col`}
        aria-expanded={!collapsed}
      >
        <div className="flex items-center border-b border-base-300 gap-2 px-3 py-3 bg-base-300">
          <a className="flex items-center gap-2" href="/">
            <IoSchool className="text-green-600 text-xl" />
            

            <span className={`${collapsed ? "hidden" : "inline"} font-bold text-lg`}>
              Scholar <span className="text-green-600">Stream</span>
            </span>
          </a>
        </div>

        
        <div className="px-1.5 md:hidden">
          <button
            onClick={() => setCollapsed((s) => !s)}
            className="btn btn-ghost"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            type="button"
          >
           
            <BsFillMenuButtonWideFill />

            
          </button>
        </div>

        
        <nav className=" flex-1  overflow-auto">
            
          <ul className="menu w-60">
            <li>
              <Link to="" className="flex pl-6 items-center gap-2">

                <IoHomeOutline className="text-xl" />
                <span className={`${collapsed ? "hidden" : "inline"}`}>Dashboard</span>
              </Link>
            </li>

            <li>
              <NavLink to="analytics" className="flex pl-6 items-center gap-2">

                <TbDeviceAnalytics className="text-xl" />
                <span className={`${collapsed ? "hidden" : "inline"}`}>Analytics</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="profile" className="flex pl-6 items-center gap-2">
                <CgProfile className="text-xl" />
                <span className={`${collapsed ? "hidden" : "inline"}`}>My Profile </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="add-scholarship" className="flex items-center pl-4 gap-2">
                <IoIosAddCircleOutline className="text-2xl"/>
                <span className={`${collapsed ? "hidden" : "inline"}`}>Add Scholarship</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="manage-scholarship" className="flex pl-4 items-center gap-2">
                {/* home icon */}
                <MdOutlineManageHistory className="text-xl" />
                <span className={`${collapsed ? "hidden" : "inline"}`}>Manage Scholarships</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink to="manage-users" className="flex pl-4 items-center gap-2">
              
                <MdManageAccounts className="text-xl" />
                <span className={`${collapsed ? "hidden" : "inline"}`}>Manage User</span>
              </NavLink>
            </li>
          </ul>
        </nav>


        <div className={`px-3 py-3 ${collapsed ? "text-center" : ""}`}>
          <button
            onClick={() => alert("logout")}
            className={`btn btn-sm btn-outline ${collapsed ? "" : "w-full"}`}
          >
            <div className={`${collapsed ? "hidden" : "flex gap-2"}`}> <p className="text-md">Logout</p> <LuLogOut className="text-lg" /></div>

            {collapsed && (
              <LuLogOut className="text-md" />
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default  DashSidebar;