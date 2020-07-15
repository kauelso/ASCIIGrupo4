import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg';

const Nova_senha =() =>{

    return(
        <div className="nova-senha-container">
            <div className="senha-side">
            <img id="icon-size" src={logo} alt="Plantfolio Ascii"/>
            <h1>Plantfolio<br></br>Ascii</h1>
            </div>
            <div className="dados-senha">
                <h2>Crie uma nova <br></br>senha</h2>
                <input type="password" placeholder="Nova Senha"></input>
                <input type="password"  placeholder="Confirme a Nova Senha"></input>
            </div>
        </div>
        
    );


}
export default Nova_senha;