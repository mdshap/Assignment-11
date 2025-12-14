import React, { use } from 'react';
import { AuthContext } from '../src/Authentication/AuthContext';
import Loader from '../src/Components/Pages/Loader/Loader';
import { Navigate } from 'react-router';

const ModeratorPrivate = ({children}) => {
      const { userFromDb, dbLoading } = use(AuthContext);

  if (dbLoading)
    return <Loader />;

  else if (userFromDb?.role !== "Moderator")
    return <Navigate to="/dashboard" replace />;

  else return children;
};

export default ModeratorPrivate;