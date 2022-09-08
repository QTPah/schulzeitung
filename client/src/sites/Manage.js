import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import SiteWrapper from '../components/SiteWrapper'
import { useAPI } from '../contexts/APIContext'

import DOMPurify from 'dompurify'
import marked from 'marked'

const Manage = () => {

    const auth = useAuth();
    const api = useAPI();

    const [message, setMessage] = useState("");

    const postData = {
        title: useRef(),
        body: useRef(),
        tags: useRef(),
        channel: useRef()
    }

    const nav = useNavigate();

    function post() {
        console.log(postData);
        if(!postData.title.current || !postData.body.current || !postData.tags.current || !postData.channel.current) return setMessage("Please fill out all fields");

        api.post({
            title: postData.title.current.value,
            body: postData.body.current.value,
            tags: postData.tags.current.value
        }).then(async res => {
            if(res.status === 200) {
                return nav('/news');
            } else if(res.status === 403) {
                await auth.sync();
                return post();
            }

            setMessage(res.message);
        });
    }

    return (
        <SiteWrapper>
            <h1>Manager</h1>
            {message}
            {auth.hasPermissions(['MANAGE:POSTS']) ? <div className='container create-post'>
                <h3><b>Create Post</b></h3>
                <label>Titel</label><br />
                <input type='text' ref={postData.title} /><br />
                <label>Body</label><br />
                <textarea ref={postData.body} style={{width: '500px', height: '200px'}} /><br />
                <label>Tags</label><br />
                <input type='text' ref={postData.tags} /><br />
                <input type='text' placeholder='Channel' ref={postData.channel} /><button onClick={post}>Post</button>
            </div> : null}
        </SiteWrapper> 
    )
}

export default Manage