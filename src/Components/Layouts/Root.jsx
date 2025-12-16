import React, { use } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../Pages/Loader/Loader";
import ReactToaster from "../../ReactToaster/ReactToaster";
import ScrollToTop from "../../../ScrollToTop";
import ScrollToTopButton from "../../../ScrollToTopButton";

const Root = () => {
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loader/>;
  }
  return (
    <div data-theme="light" className="max-w-[1600px] mx-auto bg-green-50">

      <ScrollToTop/>
      <NavBar></NavBar>
      <ReactToaster />
      <Outlet></Outlet>
      <ScrollToTopButton/>
      <Footer></Footer>
    </div>
  );
};

export default Root;
