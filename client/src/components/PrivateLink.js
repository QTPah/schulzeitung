import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
  BrowserRouter
} from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

function PrivateLink({ perms, href, children }) {

  const auth = useAuth();

  return (
    <>
      {auth.hasPermissions(perms) && <li><a href={href}>{children}</a></li>}
    </>
  );
}

export default PrivateLink;