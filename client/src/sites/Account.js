import React from 'react'
import { useAuth } from '../contexts/AuthContext'

import SiteWrapper from '../components/SiteWrapper'

const Account = () => {

    const auth = useAuth();

    return (
        <SiteWrapper>
            <div className='container'>
                <h3>Email:</h3> <div className='out'>{auth.user.email}</div><br />
                <h3>Permissions:</h3> <div className='out'>{auth.user.status.permissions.map(p => p)}</div>
            </div>
        </SiteWrapper>
    )
}

export default Account