import React, { useEffect, useRef, useState } from 'react'
import SiteWrapper from '../components/SiteWrapper';
import { useAPI } from '../contexts/APIContext';
import { useNavigate } from 'react-router-dom'


import { useAuth } from '../contexts/AuthContext'

function News() {

  const auth = useAuth();
  const api = useAPI();
  const navigate = useNavigate();


  const channelRef = useRef();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then(res => {
        console.log(res);
        setPosts(res);
    }).catch(err => {
        auth.sync();
    }).catch(err => {
        console.log(err);
    });
  } , []);

  return (
    <SiteWrapper> 
        <div className="container2">
            {posts.map(post => {
                return (
                    <div className="container" style={{margin:"10px", marginBottom:"20px"}} onClick={() => navigate(`/postviewer?post=${encodeURI(post.title)}`)}>
                        <h1>{post.title}</h1>
                        <p>{post.lead}</p>
                        {post.tags.split(',').map(t => <div style={{border: '1px solid black', width: 'fit-content', height: 'fit-content', borderRadius: '2px'}}><p style={{margin: '1px', fontSize: '12px'}}>{t}</p></div>)}
                    </div>
                )
            })}
        </div>
    </SiteWrapper>
  );
}

export default News;