import React from 'react'
import { Navigate, Route } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import SiteWrapper from './SiteWrapper';

function PrivateRoute({ perms, children }) {

  const auth = useAuth();

  return (
    <>
      {auth.hasPermissions(perms) ? children : <SiteWrapper><h1>403 ^ geh nach hause</h1></SiteWrapper>}
    </>
  );
}

export default PrivateRoute;