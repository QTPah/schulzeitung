import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteWrapper from '../components/SiteWrapper';

import { useAuth } from '../contexts/AuthContext'

function Register() {

  const auth = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const emailRef = useRef(),
        passwordRef = useRef(),
        codeRef = useRef();

  async function register() {
    if(!window.location.href.endsWith('code')) window.location.href += '?code';
    const res = await auth.signup(emailRef.current.value, passwordRef.current.value, codeRef.current ? codeRef.current.value : null);
    
    if(res.data.err) return setMessage(res.data.err);

    if(res.data.err) setMessage(res.data.err);
    if(res.data.res) {
      setMessage(res.data.res);


      if(res.data.res == "Registered") return navigate('/login');
    }
  }

  return (
    <SiteWrapper> 
        <div class="container">
            <h1>Register</h1>  
            <label>Email:</label><br />
            <input ref={emailRef} type="email" name="email" /><br />
            <label>Password:</label><br />
            <input ref={passwordRef} type="password" name="password" /><br />
            <button onClick={register} type="submit">Register</button>
        </div>
        {message ?
        <div className='container' style={{backgroundColor:'orange'}}>
          {message}
        </div> : <></>}
        {window.location.href.endsWith('code') ? <div class="container">
        <h1>Bestätigungs code</h1>
        <p>Dir wurde ein bestätigungs code per mail zugeschickt. Schreib ihn <input ref={codeRef} type="text" name="code" placeholder='hier rein' />.<br />
        Wenn du fertig bist, drückst du <button onClick={register}>hier</button></p>
        </div> : <></>}
    </SiteWrapper>
  );
}

export default Register;
