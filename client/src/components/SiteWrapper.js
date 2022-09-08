import React from 'react'

import NavBar from './NavBar';

function SiteWrapper({ children }) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}

export default SiteWrapper;