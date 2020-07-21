import React from 'react';
import { useHistory} from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';
import Loading from '../../components/Loading';

const Solicitar_senha = () => {
    const history = useHistory();
    async function handleSubmit(event){
        event.preventDefault();
        let email = document.getElementById('reset-email').value;
        let loader = document.getElementById('loader');
        let btnSolicitar = document.getElementsByName('btnSolicitar')[0];
        btnSolicitar.classList.add('hidden');
        loader.classList.remove('hidden');
        api.post('api/auth/forgot_password',{
            email
        })
        .then(function(response){
            if(response){
                //armazena o email no localStorage para posterior uso
                // na rota new-password
                localStorage.setItem('resetEmail', email);
                history.push('/feedback');
            }
        })
        .catch(function (err){
            btnSolicitar.classList.remove('hidden');
            loader.classList.add('hidden');
            history.push('/forgot-password');
        });
    }
    return (
        <div className="solicitar-container">
            <div className="solicitar-side">
                <img src={logo} alt="Plantfolio Ascii" />
                <h1>Plantfolio <br></br>Ascii</h1>
            </div>
            <div className="dados-solicitar">
                <form action="" onSubmit={handleSubmit}>
                    <h2>Recupere o acesso à sua conta</h2>
                    <input type="email" placeholder="E-mail" id="reset-email" />
                    <input name="btnSolicitar" type="submit" value="solicitar" className="input-btn" />
                    <Loading/>
                </form>
            </div>
        </div>
    );
}
export default Solicitar_senha;