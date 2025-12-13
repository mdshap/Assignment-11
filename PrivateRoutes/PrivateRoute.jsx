import React, { use } from "react";
import { AuthContext } from "../src/Authentication/AuthContext";
import { Navigate } from "react-router";
import Loader from "../src/Components/Pages/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if(loading){
    return <Loader/>
  }
  
  if (user) {
    return children;
  }

  return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;
