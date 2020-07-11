import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

const Login = () => {
  const history = useHistory();
  
  function handleRemoveClassRed(e){
    document.getElementById('login-email').classList.remove('red');
    document.getElementById('login-password').classList.remove('red');
  }

  async function handleSubmit(event){
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if(email === "" || password === ""){
      return;
    }

    api.post('/api/auth/authenticate',{
      email, password
    })
    .then(function (response){
      //console.log(response.status)
      localStorage.setItem('sessionToken', response.data.token);
      localStorage.setItem('sessionUserId', response.data.user._id);
      history.push('/');
    })
    .catch( function(err){
      console.log(err);
      document.getElementById('login-email').setAttribute('class','red');
      document.getElementById('login-password').setAttribute('class','red');
    })
  }

  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" id="login-email" onChange={
          handleRemoveClassRed
        }/>
        <input type="password" placeholder="Senha" id="login-password" onChange={
          handleRemoveClassRed
        }/>
        <input type="submit" value="Entrar" className="input-btn" onClick={handleSubmit}/>
        <Link className="back-link" to="/forgot-password">
            Esqueceu a senha?
        </Link>
      </form>
      <div className="login-side">
        <img src={logo} alt="Plantfolio Ascii"/>
        <h1>Plantfolio<br></br>Ascii</h1>
        <Link className="back-link" to="/register">
            Cadastrar-se
            <FiLogIn size={16} color="#0d7"/>
        </Link>
      </div>
    </div>
  );
}

export default Login;