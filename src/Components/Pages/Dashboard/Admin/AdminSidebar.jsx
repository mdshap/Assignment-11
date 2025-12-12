import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdManageAccounts, MdOutlineManageHistory } from 'react-icons/md';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { NavLink } from 'react-router';

const AdminSidebar = ({ collapsed }) => {
  const itemClass = collapsed
    ? "flex items-center justify-center gap-2  min-w-0"
    : "flex items-center gap-2 pl-4 min-w-0";

  return (
    <div className="min-w-0">
      <li>
        <NavLink to="analytics" className={itemClass}>
          <TbDeviceAnalytics className="text-xl shrink-0" />
          <span className={`${collapsed ? "hidden" : "inline"} truncate min-w-0`}>
            Analytics
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="add-scholarship" className={itemClass}>
          <IoIosAddCircleOutline className="text-2xl shrink-0" />
          <span className={`${collapsed ? "hidden" : "inline"} truncate min-w-0`}>
            Add Scholarship
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="manage-scholarship" className={itemClass}>
          <MdOutlineManageHistory className="text-xl shrink-0" />
          <span className={`${collapsed ? "hidden" : "inline"} truncate min-w-0`}>
            Manage Scholarships
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="manage-users" className={itemClass}>
          <MdManageAccounts className="text-xl shrink-0" />
          <span className={`${collapsed ? "hidden" : "inline"} truncate min-w-0`}>
            Manage Users
          </span>
        </NavLink>
      </li>
    </div>
  );
};

export default AdminSidebar;
