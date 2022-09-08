import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import SiteWrapper from '../components/SiteWrapper'
import { useAPI } from '../contexts/APIContext';

import '../css/Rubriken.css'
import RubrikBox from '../components/RubrikBox';

const Rubriken = () => {
    return (
        <SiteWrapper>
            <div className='rubriken-grid'>
                <RubrikBox name='Globale News' description='Ganz viele globale news.' />
                <RubrikBox name='Aktuelles an der Schule' description='Sachen die aktuell an der Schule sind' />
                <RubrikBox name='Umfragen' description='Umfragen halt.' />
                <RubrikBox name='Wissen' description=' verschiedene Sachen: Geo/Naturphänomene' />
                <RubrikBox name='Küche/Rezepte' description='Hier kochen wir essen und rezepte' />
                <RubrikBox name='Fotowettbewerbe' description='Ganze fotogalerien und so' />
                <RubrikBox name='Comics' description='Genzeichnete menschen machen krasse sachen' />
                <RubrikBox name='Rätsel und Witze' description='Lustige und nachdenkende texte' />
            </div>
        </SiteWrapper>
    )
}

export default Rubriken