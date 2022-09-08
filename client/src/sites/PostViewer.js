import React, { useEffect, useRef, useState } from 'react'
import SiteWrapper from '../components/SiteWrapper';
import { useAPI } from '../contexts/APIContext';
import { useAuth } from '../contexts/AuthContext'

import { useLocation } from 'react-router-dom'

function PostViewer() {

    const location = useLocation()

    const auth = useAuth();
    const api = useAPI();

    const [post, setPost] = useState();
    let params = location.search.substring(1, location.search.length).split('&').map(s => s.split('='));

    useEffect(() => {
        api.getPosts().then(res => {
            setPost(res.find(p => params.find(r => r[1] === p.title)));
            console.log(post);
        }).catch(err => {
            auth.sync();
        }).catch(err => {
            console.log(err);
        });
    } , []);

    return (
        <SiteWrapper> 

        </SiteWrapper>
    );
}

export default PostViewer;