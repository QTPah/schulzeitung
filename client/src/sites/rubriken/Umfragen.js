import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

import SiteWrapper from '../../components/SiteWrapper'

const Umfragen = () => {

    const auth = useAuth();

    return (
        <SiteWrapper>
            <div className="container" style={{ width: "50%", height: "fit-content", margin: '5px', padding: '5px' }}>
                <h3>Aktuelle Umfragen</h3>
            </div>
        </SiteWrapper>
    )
}

export default Umfragen