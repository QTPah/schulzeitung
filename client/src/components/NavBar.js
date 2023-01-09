import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../css/NavBar.css"
import pfp from "../images/default_pfp.png"
import { useAuth } from '../contexts/AuthContext'
import PrivateLink from './PrivateLink'

function NavBar() {

    const Pfp = useRef();
    const PfpDropdown = useRef();
    const auth = useAuth();
    
    useEffect(() => {
        PfpDropdown.current.style.display = "none";

        Pfp.current.onclick = () => {
            PfpDropdown.current.style.display = PfpDropdown.current.style.display === "none" ? "" : "none";
        }

        document.addEventListener('click', (ev) => {
            try {
                if(!ev.path.includes(PfpDropdown.current) && !ev.path.includes(Pfp.current) && PfpDropdown.current.style.display !== "none") {
                    PfpDropdown.current.style.display = "none";
                }
            } catch(err) {}
        });
    }, []);

    function logout() {
        auth.logout();
    }

    return (
        <>
            <nav className="navbar">
                <ul className="nav-links">
                    <div className="menu">
                        <li><a href="/">Home</a></li>
                        <PrivateLink href="/news" perms={["VIEW:POSTS"]}>News</PrivateLink>
                        <PrivateLink href="/rubriken" perms={["VIEW:RUBRIKEN"]}>Rubriken</PrivateLink>
                        <PrivateLink href="/manage" perms={["MANAGE:"]}>Manage</PrivateLink>
                    </div>
                    <div className="pfp">
                        <li>
                            <img src={pfp} alt="pfp" className="pfp_image" ref={Pfp} />
                            <ul className="dropdown" ref={PfpDropdown} >
                                {!auth.user && <li><a href="/login">Login</a></li>}
                                {!auth.user && <li><a href="/register">Register</a></li>}
                                {auth.user && <li><a href="/account">Account</a></li>}
                                {auth.user && <li><a onClick={logout}>Logout</a></li>}
                            </ul>
                        </li>
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;