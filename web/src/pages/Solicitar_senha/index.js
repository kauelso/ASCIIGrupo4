import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg';

const Solicitar_senha=()=>{

return(
    <div className="solicitar-container">
        <div className="solicitar-side">
        <img id="icon-size" src={logo} alt="Plantfolio Ascii"/>
            <h1>Plantfolio <br></br>Ascii</h1>
        </div>
        <div className="dados-solicitar">
            <h2>Recupere o acesso à sua conta</h2>
            <input className="" type="email" placeholder="E-mail associado a conta"></input>
            <br></br>
            <button type="button" className="solicitar" >Solicitar link de recuperação</button>
        </div>

    </div>


);
}
export default Solicitar_senha;