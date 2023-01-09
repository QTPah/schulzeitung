import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import SiteWrapper from '../components/SiteWrapper'
import { useAPI } from '../contexts/APIContext'

import DOMPurify from 'dompurify'
import marked from 'marked'
import User from '../components/User'

const Manage = () => {

    const auth = useAuth();
    const api = useAPI();

    const [message, setMessage] = useState("");
    const [users, setUsers] = useState([]);

    const postData = {
        title: useRef(),
        lead: useRef(),
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
            lead: postData.lead.current.value,
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

    useEffect(() => {
        auth.getUsers().then(res => setUsers(res));
    }, []);

    return (
        <SiteWrapper>
            <h1 style={{fontSize: '40px', marginLeft: '20px'}}>Manager</h1>
            {message}
            {auth.hasPermissions(['MANAGE:POSTS']) ? <div className='container create-post'>
                <h3 style={{fontSize: '35px'}}><b>Create Post</b></h3>
                <label>Titel</label><br />
                <input type='text' ref={postData.title} /><br />
                <label>Lead</label><br />
                <textarea ref={postData.lead} style={{width: '500px', height: '100px'}} /><br />
                <label>Body</label><br />
                <textarea ref={postData.body} style={{width: '500px', height: '200px'}} /><br />
                <label>Tags</label><br />
                <input type='text' ref={postData.tags} /><br />
                <input type='text' placeholder='Channel' ref={postData.channel} /><button onClick={post}>Post</button>
            </div> : null}
            {auth.hasPermissions(['MANAGE:USERS']) ? <div className='container user-list'>
            <h3 style={{fontSize: '35px'}}><b>Users</b></h3>
                {users ? users.map(u => <User user={u} key={u.email} />) : null}
            </div> : null}
        </SiteWrapper> 
    )
}

export default Manage