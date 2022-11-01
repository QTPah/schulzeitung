import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import SiteWrapper from '../components/SiteWrapper'
import axios from 'axios';
import { useAPI } from '../contexts/APIContext';

import bigbabafoto from '../images/bigbabafoto.jpg'

const Home = () => {

    const auth = useAuth();
    const api = useAPI();
    
    const [apiStatus, setAPIStatus] = useState('');

    async function checkAPI() {
        let res = await api.test();
        setAPIStatus(res.message);
    }

    return (
        <SiteWrapper>
            <p style={{ margin: '30px 20px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus finibus malesuada erat, et tincidunt mauris condimentum et. Suspendisse sagittis augue gravida, porta nisl non, egestas dolor. Etiam mollis tincidunt dui id tempor. Pellentesque commodo orci libero, vel vulputate nunc tincidunt eget. Nunc eu pulvinar lorem. Duis at varius dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec at magna malesuada magna efficitur ornare sed non dolor. Fusce sapien mi, hendrerit a nisi a, faucibus euismod lectus. Duis lobortis mi vitae volutpat luctus. Curabitur vel vestibulum tellus. Praesent luctus nulla ut feugiat tincidunt. Vivamus nec lectus ipsum. Donec ornare mauris sagittis lorem fringilla auctor ultricies at libero.

                Aenean ullamcorper efficitur urna, a congue tortor gravida fringilla. Nunc vel leo vulputate, semper orci quis, blandit velit. Donec sollicitudin a nisl a mollis. Fusce suscipit ex sollicitudin tortor egestas vulputate. Morbi vitae aliquet magna, id maximus velit. Quisque feugiat vel urna vitae sodales. Aenean libero eros, ultrices a consequat dignissim, suscipit vel odio. Aliquam a ultricies libero, non tristique dui. In eget lectus gravida, euismod magna non, ornare velit. Vivamus congue eleifend pellentesque. Suspendisse feugiat vitae lorem id commodo. Curabitur ut suscipit mauris, id mollis mauris. Aenean dolor magna, efficitur sed interdum quis, lacinia vitae ligula.

                Fusce euismod justo a mauris sollicitudin, at mollis risus porttitor. Maecenas in eros magna. Curabitur rutrum felis eget libero dictum euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam sit amet magna tincidunt, semper eros nec, commodo ante. Donec et feugiat augue. Curabitur congue risus nisl, ut bibendum arcu viverra a. Cras feugiat, leo id tincidunt sodales, ligula enim ullamcorper nunc, ut viverra lorem velit a libero. Nunc fringilla ante ligula, et ornare nunc dictum eu. Ut varius imperdiet pharetra.

                Mauris felis arcu, interdum vitae feugiat eget, condimentum id leo. In vestibulum, massa et aliquam malesuada, enim eros varius dui, vitae bibendum justo tortor eget felis. Nam nibh velit, fermentum et faucibus vel, dignissim quis quam. Aliquam erat volutpat. Nullam mollis ex nec neque scelerisque vestibulum. Nam volutpat, urna non vestibulum dictum, augue ex porttitor mauris, id mattis eros dui in est. Integer fermentum ex erat, eget faucibus turpis aliquam quis. Integer iaculis erat risus, lacinia sagittis turpis faucibus vel. In mattis pharetra nisi, eu placerat sapien tristique vitae. Quisque consectetur elit justo, sit amet luctus velit pellentesque et. Phasellus lorem ligula, placerat a elit ac, rutrum tempor turpis. Ut ac tortor metus. Etiam malesuada dictum risus ac pretium. Fusce congue et leo eu blandit. Mauris suscipit, nunc ut molestie eleifend, quam est maximus massa, ut tempus nisi ante eget sapien. Suspendisse potenti.
                <br />
                - Memmolo Nerea
            </p>

            <h1>{ auth.user ? "logged in" : "signed out" }</h1><br />
            <button onClick={checkAPI}>Check API</button>{apiStatus}
        </SiteWrapper>
    )
}

export default Home