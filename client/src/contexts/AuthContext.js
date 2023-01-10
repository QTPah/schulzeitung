import React, { useContext, useState, useEffect } from "react"
import Axios from "axios"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  Axios.defaults.withCredentials = false;

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(false)

  const config = {
    server: {
      auth: "http://localhost:3002"
    },
    path: {
      login: "/login",
      signup: "/register",
      check: "/check",
      logout: "/logout",
      refresh: "/token",
      getUsers: "/getusers",
      revokePermission: "/revokepermission",
      grantPermission: "/grantpermission"
    }
  }

  async function signup(email, password, code) {
    setLoading(true);

    const res = await Axios.post(`/auth${config.path.signup}`, { email, password, code });
    console.log(res);
    setLoading(false);

    return res;
  }

  async function login(email, password) {
    setLoading(true);

    let res = await Axios.post(`/auth${config.path.login}`, { email, password });

    if(!res.data.auth) {
      setLoading(false);
      return res.data.err;
    }

    localStorage.setItem("token", 'Bearer ' + res.data.accessToken);
    localStorage.setItem("refresh_token", res.data.refreshToken);

    setUser(res.data.user);

    setLoading(false);
    return res.data.auth;
  }

  async function check() {
    setLoading(true);

    let res;

    try {
      res = await Axios.post(`/auth${config.path.check}`, null, { headers: { "authorization": localStorage.getItem("token")}});
    } catch(err) {
      setUser(null);
      setLoading(false);
      return false;
    }

    setUser(res.data.user || null); 

    setLoading(false);
    return res.data.auth;
  }

  async function logout() {
    await Axios.delete(`/auth${config.path.logout}`);

    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setUser();
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  }

  async function refreshToken() {
    const res = await Axios.post(`/auth${config.path.refresh}`, {token: localStorage.getItem("refresh_token") });
    if(res.data.token) localStorage.setItem('token', 'Bearer ' + res.data.token);
  }

  async function sync() {
    let res = await check()

    if(!res) {
      await refreshToken();
      await check();
    }
  }

  function hasPermissions(perms) {
    return user ? perms.every(v => {
      return v[v.length - 1] === ':' ?
        user.status.permissions.includes(user.status.permissions.find(p => p.startsWith(v.slice(0, -1)))) :
        user.status.permissions.includes(v)
    }) : false;
  }

  async function updateEmail(newEmail) {

  }

  async function getUsers() {
    const res = await Axios.post(`/auth${config.path.getUsers}`, {}, { headers: { "authorization": localStorage.getItem('token') } });
  
    if(res.status !== 200) {
      await sync();
    }

    return res.data.users;
  }

  async function revokePermission(email, permission) {
    const res = await Axios.delete(`/auth${config.path.revokePermission}`, { headers: { "authorization": localStorage.getItem('token') }, data: { email, permission } })
  }

  async function grantPermission(email, permission) {
    const res = await Axios.post(`/auth${config.path.grantPermission}`, { email, permission }, { headers: { "authorization": localStorage.getItem('token') } });
  }

  useEffect(() => {
    sync();
  }, [])
  
  const value = {
    login, signup, logout, check, refreshToken, sync, user, hasPermissions, getUsers, revokePermission, grantPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  )
}