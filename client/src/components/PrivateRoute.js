import React from 'react'
import { Navigate, Route } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ perms, children }) {

  const auth = useAuth();

  return (
    <>
      {auth.hasPermissions(perms) ? children : <h1>404</h1>}
    </>
  );
}

export default PrivateRoute;