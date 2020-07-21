import React from 'react';
import './styles.css';

import { Link } from 'react-router-dom';    

import logo from '../../assets/logo.svg';

const Feedback =() => {
    return (
        <div>
            <div className="body" id="feedback">
                <img src={logo} alt="Plantfolio Ascii"/>
                <h1>plantfolio<br></br>ascii</h1>
                <h2>Se o email informado<br></br>
                pertencer a alguma conta um<br></br>
                link de recuperação de senha<br></br>
                será enviado a ele!</h2>
                <p>verifique seu e-mail para continuar</p>
                <Link className="back-link" to="/login">Fazer login</Link>
            </div>
        </div>
    );
    }
export default Feedback;



