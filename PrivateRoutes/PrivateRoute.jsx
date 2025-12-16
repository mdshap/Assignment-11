import React, { use, useEffect, useRef } from "react";
import { AuthContext } from "../src/Authentication/AuthContext";
import { Navigate } from "react-router";
import Loader from "../src/Components/Pages/Loader/Loader";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
    const hasShownToast = useRef(false);

  useEffect(() => {
    if (!loading && !user && !hasShownToast.current) {
      toast.error("Please Login to Access This Feature");
      hasShownToast.current = true;
    }
  }, [loading, user]);


  if (loading) {
    return <Loader />;
  }

  if (user) {
    return children;
  }

    return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
