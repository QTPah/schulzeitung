import React, { useContext, useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "./AuthContext";

const APIContext = React.createContext()

export function useAPI() {
  return useContext(APIContext)
}

export function APIProvider({ children }) {

    const auth = useAuth();

    const authorizedOpts = (opts) => Object.assign({ headers: { "authorization": localStorage.getItem('token') } }, opts);

    async function test() {
      let res = await axios.get('/api/ping', authorizedOpts()).catch(async err => {
        await auth.sync();
      });

      if(res.status !== 200) {
        await auth.sync();
        return test();
      }

      return res.data;
    }

    async function post(data) {
      console.log(data);

      let res = await axios.post('/api/post', data, {headers: { "authorization": localStorage.getItem('token') }});

      if(res.status !== 200) {
        await auth.sync();
        return test();
      }

      return {status: res.status, message: res.data.message};
    }

    async function getPosts() {
      let res = await axios.get('/api/posts', authorizedOpts());

      if(res.status !== 200) {
        await auth.sync();
        return test();
      }

      return res.data;
    }

    useEffect(() => {

    }, [])

    const value = {
        test,
        post,
        getPosts
    }

  return (
    <APIContext.Provider value={value}>
      {children}
    </APIContext.Provider>
  )
}