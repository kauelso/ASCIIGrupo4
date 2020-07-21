import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg';

import "rbx/index.css";
import { Container, Column } from 'rbx';


const Nova_senha = () => {

    return (
        <Container fluid breakpoint="mobile">

            <Column.Group multiline centered>


                <Column size="half" breakpoint="mobile">
                    <div className="nova-senha-container">
                        <div className="senha-side">
                            <img id="icon-size" src={logo} alt="Plantfolio Ascii" />
                            <h1>Plantfolio<br></br>Ascii</h1>
                        </div>
                    </div>

                </Column>
                <Column size="half" breakpoint="mobile">
                    <div className="dados-senha">
                        <form action="">
                            <h2>Crie uma nova senha</h2>
                            <input className="input-nova-senha" type="password" placeholder="Nova Senha"></input>
                            <input className="input-nova-senha" type="password" placeholder="Confirme a Nova Senha"></input>
                            <input type="submit" value="Confirmar" className="input-btn" />
                        </form>
                    </div>

                </Column>
            </Column.Group>

        </Container>


        
        
    );


}
export default Nova_senha;