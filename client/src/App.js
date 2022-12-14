import React from 'react'
import PrivateRoute from './components/PrivateRoute';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link
} from "react-router-dom";

import { useAuth } from './contexts/AuthContext';

import Home from './sites/Home';
import Login from './sites/Login';
import Register from './sites/Register';
import Account from './sites/Account';
import Manage from './sites/Manage';
import News from './sites/News';
import Rubriken from './sites/Rubriken';
import PostViewer from './sites/PostViewer';

import Umfragen from './sites/rubriken/Umfragen';

import './css/App.css';
import SiteWrapper from './components/SiteWrapper';

function App() {

  const auth = useAuth();

  return (
    <>
      
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
              {auth.user && <Route path="/account" element={<Account />} />}
              {!auth.user && <Route path="/login" element={<Login />} />}
              {!auth.user && <Route path="/register" element={<Register />} />}
              <Route path="/manage" element={
                <PrivateRoute perms={['MANAGE:']}>
                  <Manage />
                </PrivateRoute>
              } />
             <Route exact path="/news" element={
                <PrivateRoute perms={['VIEW:POSTS']}>
                  <News />
                </PrivateRoute>
              } />
              <Route exact path="/rubriken" element={
                <PrivateRoute perms={['VIEW:RUBRIKEN']}>
                  <Rubriken />
                </PrivateRoute>
              } />
              <Route exact path="/postviewer" element={
                <PrivateRoute perms={['VIEW:']}>
                  <PostViewer />
                </PrivateRoute>
              } />

              <Route exact path="/rubriken/umfragen" element={
                <PrivateRoute perms={['VIEW:']}>
                  <Umfragen />
                </PrivateRoute>
              } />
              

              <Route path="*" element={<SiteWrapper><h1>404</h1></SiteWrapper>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;