import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg';


import "rbx/index.css";
import { Container, Column } from 'rbx';


const Solicitar_senha = () => {

    return (
        <Container fluid breakpoint="mobile">

            <Column.Group multiline centered>


                <Column size="half" breakpoint="mobile">
                    <div className="solicitar-container">
                        <div className="solicitar-side">
                            <img src={logo} alt="Plantfolio Ascii" />
                            <h1>Plantfolio <br></br>Ascii</h1>
                        </div>
                    </div>

                </Column>
                <Column size="half" breakpoint="mobile">
                    <div className="dados-solicitar">
                        <form action="">
                            <h2>Recupere o acesso à sua conta</h2>
                            <input type="text" placeholder="E-mail" id="login-password" />
                            <input type="submit" value="solicitar" className="input-btn" />
                        </form>

                    </div>

                </Column>
            </Column.Group>

        </Container>




    );
}
export default Solicitar_senha;