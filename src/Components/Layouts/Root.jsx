import React, { use } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../Pages/Loader/Loader";

const Root = () => {
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loader/>;
  }
  return (
    <div data-theme="light" className="max-w-[1600px] mx-auto">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
