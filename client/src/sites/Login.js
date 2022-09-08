import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteWrapper from '../components/SiteWrapper';

import { useAuth } from '../contexts/AuthContext'

function Login() {

  const auth = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const emailRef = useRef(),
        passwordRef = useRef();

  async function login() {
    const res = await auth.login(emailRef.current.value, passwordRef.current.value);

    if(typeof res === 'string') return setMessage(res);

    if(res === true) return navigate('/');
  }

  return (
    <SiteWrapper> 
        <div class="container">
            <h1>Login</h1>  
            <label>Email:</label><br />
            <input ref={emailRef} type="email" name="email" /><br />
            <label>Password:</label><br />
            <input ref={passwordRef} type="password" name="password" /><br />
            <div class="message">{message}</div>{message !== "" && <br />}
            <button onClick={login} type="submit">Login</button>
        </div>
    </SiteWrapper>
  );
}

export default Login;
