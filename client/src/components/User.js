import React, { useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext';

function User({ user }) {

    const userRef = useRef();
    const infoRef = useRef();
    const permissionRef = useRef();

    const auth = useAuth();

    useEffect(() => {
        infoRef.current.style.display = "none";

        userRef.current.onclick = () => {
            infoRef.current.style.display = infoRef.current.style.display === "none" ? "" : "none";
        }

        document.addEventListener('click', (ev) => {
            if(!ev.path.includes(infoRef.current) && !ev.path.includes(userRef.current) && infoRef.current.style.display !== "none") {
                infoRef.current.style.display = "none";
            }
        }); 
    }, []);

    return (
        <>
            <div ref={userRef} className='user' style={{border: '2px solid black', borderRadius: '4px', fontSize: '20px'}}>
                <p style={{margin: '5px'}}>{user.email}</p>
            </div>
            <div ref={infoRef} className='userinfo' style={{border: '2px solid black', borderRadius: '1px', fontSize: '16px'}}>
                    
                <h5>Permissions:</h5>
                    {user.status.permissions.map(p => (<p style={{fontSize: '15px', border: '1px solid black', width: 'fit-content'}} onClick={() => {
                            auth.revokePermission(user.email, p).then(() => {
                                window.location.reload();
                            });
                    }} key={p} >{p}<br /></p>))}
                    <input ref={permissionRef} type="text" placeholder="Permission"></input><button onClick={() => {
                        auth.grantPermission(user.email, permissionRef.current.value);
                        window.location.reload();
                    }}>Grant</button>
            </div>
        </>
    );
}

export default User;