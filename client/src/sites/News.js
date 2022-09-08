import React, { useEffect, useRef, useState } from 'react'
import SiteWrapper from '../components/SiteWrapper';
import { useAPI } from '../contexts/APIContext';

import { useAuth } from '../contexts/AuthContext'

function News() {

  const auth = useAuth();
  const api = useAPI();

  const channelRef = useRef();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then(res => {
        setPosts(res);
    }).catch(err => {
        auth.sync();
    }).catch(err => {
        console.log(err);
    });
  } , []);

  return (
    <SiteWrapper> 
        <input ref={channelRef} type="text" placeholder="Channel"></input>
        <div className="container2">
            {posts.map(post => {
                return (
                    <div className="container" style={{margin:"10px", marginBottom:"20px"}}>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <p>{post.tags}</p>
                    </div>
                )
            })}
        </div>
    </SiteWrapper>
  );
}

export default News;