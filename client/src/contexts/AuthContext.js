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
      refresh: "/token"
    }
  }

  async function signup(email, password, code) {
    setLoading(true);

    const res = await Axios.post(`/auth${config.path.signup}`, { email, password, code });

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

    console.log(res.data.user);

    setUser(res.data.user);

    setLoading(false);
    return res.data.auth;
  }

  async function check() {
    setLoading(true);

    let res;

    try {
      res = await Axios.get(`/auth${config.path.check}`, { headers: { "authorization": localStorage.getItem("token") } });
    } catch(err) {
      setUser(null);
      setLoading(false);
      return false;
    }

    console.log(res.data.user);

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

  function getPermissions() {
    if(!user) return [];

    let perms = [];

    user.status.roles.forEach(r => {
      perms.push(...r.permissions);
    });

    return perms;
  }

  function hasPermissions(perms) {
    return user ? perms.every(v => {
      return v[v.length - 1] === ':' ? 
        getPermissions().includes(getPermissions().find(p => p.startsWith(v.slice(0, -1)))) : 
        getPermissions().includes(v)
    }) : false;
  }

  async function updateEmail(newEmail) {

  }

  useEffect(() => {
    sync();
  }, [])
  
  const value = {
    login, signup, logout, check, refreshToken, sync, user, getPermissions, hasPermissions
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <h1>Loading...</h1> : children}
    </AuthContext.Provider>
  )
}