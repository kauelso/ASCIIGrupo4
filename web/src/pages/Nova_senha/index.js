import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg';

const Nova_senha =() =>{

    return(
        <div>
            <div className="senha-side">
            <img id="icon-size" src={logo} alt="Plantfolio Ascii"/>
            <h1>Plantfolio<br></br>Ascii</h1>
            </div>
            <div className="dados-senha">
                <h2>Crie uma nova <br></br>senha</h2>
                
            </div>
        </div>
        
    );


}
export default Nova_senha;