import React from 'react';
import './styles.css';

import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Loading from '../../components/Loading';

import "rbx/index.css";
import { Container, Column } from 'rbx';

const Nova_senha =(props) =>{
    const history = useHistory();
    function handleSubmit(event){
        event.preventDefault();
        let loader = document.getElementById('loader');
        let feedbackTxt = document.getElementById('feedback-text');
        loader.classList.remove('hidden');
        feedbackTxt.classList.add('hidden');

        let email = localStorage.getItem('resetEmail');
        let passwd1 = document.getElementById('passwd1').value;
        let passwd2 = document.getElementById('passwd2').value;
        if(passwd1.toString().length < 6 || passwd2.toString().length < 6 || 
            passwd1.toString() !== passwd2.toString()){
                loader.classList.add('hidden');
                feedbackTxt.classList.remove('hidden');
                return;
        }
        let token = props.location.pathname;
        token = token.split('/new-password/')[1];
        console.log(email,' - ',passwd1,' - ',token);
        api.put('api/auth/reset_password', {
            email, password: passwd1, token
        }).then(function (response){
            if(response){
                console.log(response);
                localStorage.removeItem('sessionToken');
                localStorage.removeItem('resetEmail');
                window.history.replaceState(null, null, "/");
                history.push('/login');
            }
        }).catch(function(err){
            console.log(err);
            localStorage.removeItem('resetEmail');
            loader.classList.add('hidden');
            feedbackTxt.classList.remove('hidden');
            history.push('#');
        });
    }
    
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
                        <form action="" onSubmit={handleSubmit}>
                            <h2>Crie uma nova senha</h2>
                            <input className="input-nova-senha" id="passwd1" type="password" placeholder="Nova Senha"></input>
                            <input className="input-nova-senha" id="passwd2" type="password" placeholder="Confirme a Nova Senha"></input>
                            <input type="submit" value="Confirmar" className="input-btn"  onClick={handleSubmit}/>
                            <Loading/>
                            <p id="feedback-text" className="text-error hidden" >Falha na alteração da senha,<br/>
                            verifique se as senhas conferem e<br/> 
                            contem pelo menos 6 caracteres</p>
                        </form>
                    </div>
                </Column>

            </Column.Group>
        </Container>        
    );
}
export default Nova_senha;