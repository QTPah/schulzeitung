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

import './css/App.css';
import PostViewer from './sites/PostViewer';

function App() {

  const auth = useAuth();

  return (
    <>
      
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
              {auth.user && <Route path="/account" element={<Account />} />}
              {auth.user && <Route path="/rubriken" element={<Rubriken />} />}
              {!auth.user && <Route path="/login" element={<Login />} />}
              {!auth.user && <Route path="/register" element={<Register />} />}
              <Route path="/manage" element={
                <PrivateRoute path='/manage' element={<Manage />} perms={['MANAGE:']}>
                  <Manage />
                </PrivateRoute>
              } />
             <Route exact path="/news" element={
                <PrivateRoute path='/news' element={<News />} perms={['VIEW:']}>
                  <News />
                </PrivateRoute>
              } />
              <Route exact path="/postviewer" element={
                <PrivateRoute path='/postviewer' element={<PostViewer />} perms={['VIEW:']}>
                  <PostViewer />
                </PrivateRoute>
              } />
          </Routes>
        </Router>
    </>
  );
}

export default App;