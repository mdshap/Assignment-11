import React from "react";
import { use } from "react";
import { Link, NavLink } from "react-router";
import { FaUser } from "react-icons/fa";
import { MdDashboard, MdOutlineAssignment } from "react-icons/md";
import { IoSchool } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../../Authentication/AuthContext";

const Navbar = () => {
  const { user, loading, signOutUser, setUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((error) => console.log(error.message));
  };


  const links = (
    <div className="lg:flex gap-3  text-center">
      <li>
        <NavLink
          to="/"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Home Page">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarships"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="All available books in the website">
          All Scholarships
        </NavLink>
      </li>
      {user ? (
        ""
      ) : (
        <>
          {loading ? (
            ""
          ) : (
            <>
              <li>
                <NavLink
                  to="/register"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Connect with us!">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Connect with us!">
                  Login
                </NavLink>
              </li>
            </>
          )}
        </>
      )}

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Add Y=your books in our library">
              Dashboard
            </NavLink>
          </li>
          
        </>
      )}
    
    </div>
  );

  return (
    <div className="sticky top-0 z-60">
      <div className="navbar bg-green-100 max-h-12 sm:max-h-17 sm:min-h-0  max-w-[1600px] mx-auto shadow-sm">
        <div className="navbar-start px-2 sm:px-6 z-40">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost px-2 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu -ml-4.5 sm:-ml-7.5 menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3.5 sm:mt-4  w-60 max-h-45 px-2 py-4 shadow">
              {links}
            </ul>
          </div>
          <a
            className="btn btn-ghost text-lg sm:text-2xl font-bold hover:bg-transparent hover:border-0 flex items-center"
            href="/">
            <IoSchool className="text-green-600" />
            Scholar<span className="text-green-600">Stream</span>
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="  md:mr-19">
              <div className="dropdown dropdown-end md:dropdown-center">
                <div tabIndex={0} role="button" className=" m-1">
                  <Link to="/profile">
                    <img
                      className="rounded-full cursor-pointer object-cover w-11 h-11 sm:h-13 sm:w-13"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user?.displayName}
                      src={`${user?.photoURL}`}
                      alt="user_img"
                      title={`User: ${user?.displayName}`}
                    />
                  </Link>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box  w-45 md:w-55 border p-2 z-40 shadow-sm ">
                  <li>
                    <Link to="/dashboard/profile">
                      {" "}
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <MdDashboard /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleSignOut}
                      className="btn mt-3 h-8 border-red-500 bg-red-500 text-[10px] md:text-[12px] text-white">
                      <p className="">Logout</p> <MdLogout />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 ">
              <Link
                className="btn px-2 py-1 h-9 sm:h-10 sm:px-4 text-[11px] md:text-[16px] bg-green-600 text-white"
                to="/login">
                Login <FaUser />
              </Link>
              <Link
                to="/register"
                className="btn bg-transparent text-[11px] px-2 h-9 sm:h-10 py-1 sm:px-4 md:text-[16px] border-green-600 text-green-700">
                Register <MdOutlineAssignment />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
