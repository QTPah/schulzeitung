import React, { useEffect, useRef, useState } from 'react'
import SiteWrapper from '../components/SiteWrapper';
import { useAPI } from '../contexts/APIContext';
import { useAuth } from '../contexts/AuthContext'

import { useLocation } from 'react-router-dom'

import "../css/PostViewer.css"

function PostViewer() {

    const location = useLocation()

    const auth = useAuth();
    const api = useAPI();

    const [post, setPost] = useState({id:-1,title:"ICH LADEN",body:"",tags:"",stats:{}});
    let params = location.search.substring(1, location.search.length).split('&').map(s => s.split('='));

    useEffect(() => {
        api.getPosts().then(res => {    
            setPost(res.find(p => params.find(r => decodeURI(r[1]) === p.title)));
        }).catch(err => {
            auth.sync();
        }).catch(err => {
            console.log(err);
        });
    } , []);

    return (
        <SiteWrapper>
            <div className="postWrapper" style={{textAlign:'center', position:'relative'}}>
                <h1 style={{fontFamily:"pricedown", fontSize: '70px'}}>{post.title}</h1>
                <p style={{fontSize:'18px'}}>
                    {post.body}
                </p>
            </div>
        </SiteWrapper>
    );
}

export default PostViewer;