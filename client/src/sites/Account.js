import React from 'react'
import { useAuth } from '../contexts/AuthContext'

import SiteWrapper from '../components/SiteWrapper'
import Role from '../components/Role'

const Account = () => {

    const auth = useAuth();

    return (
        <SiteWrapper>
            <div className='container'>
                <h3>Email:</h3> <div className='out'>{auth.user.email}</div><br />
                <h3>Roles:</h3> <div className='out'>{auth.user.status.roles.map(r => <Role key={r} role={r}></Role>)}</div>
            </div>
        </SiteWrapper>
    )
}

export default Account