import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import './styles.css';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import "rbx/index.css";
import {Container, Column} from 'rbx';


const Register = () => {
  const history = useHistory();

  function handleRemoveClassRed(e) {
    document.getElementById('register-name').classList.remove('red');
    document.getElementById('register-email').classList.remove('red');
    document.getElementById('register-password').classList.remove('red');
    document.getElementById('register-password2').classList.remove('red');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const password2 = document.getElementById('register-password2').value;

    if (name === "" || email === "" || password === "" || password2 === "") {
      return;
    }
    //verificar se as senhas conferem
    if (password.toString() !== password2.toString())
      return;

    api.post('/api/auth/register', {
      name, email, password
    })
      .then(function (response) {
        //console.log(response.status)
        localStorage.setItem('sessionToken', response.data.token);
        history.push('/');
      })
      .catch(function (err) {
        console.log(err);
        document.getElementById('register-name').setAttribute('class', 'red');
        document.getElementById('register-email').setAttribute('class', 'red');
        document.getElementById('register-password').setAttribute('class', 'red');
        document.getElementById('register-password2').setAttribute('class', 'red');
      })
  }

  return (
    <Container fluid breakpoint="mobile">

    <Column.Group multiline centered>


  <Column size="half" breakpoint="mobile">
  <div className="register-container">
      <div className="register-side">
        <img src={logo} alt="Plantfolio Ascii" />
        <h1>Plantfolio<br></br>Ascii</h1>
        <Link className="back-link" to="/login">
          Faça Login
            <FiLogIn size={16} color="#0d7" />
        </Link>
        </div>
        </div>
    
  </Column>
    <Column size="half" breakpoint="mobile">
    <div className="register-rigth">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder="Digite seu nome" id="register-name" onChange={
            handleRemoveClassRed
          } />
          <input type="email" placeholder="Digite seu melhor e-mail" id="register-email" onChange={
            handleRemoveClassRed
          } />
          <div className="passwords">
            <input type="password" placeholder="Digite sua senha" id="register-password" onChange={
              handleRemoveClassRed
            } />
            <input type="password" placeholder="Confirme sua senha" id="register-password2" onChange={
              handleRemoveClassRed
            } />
          </div>

          <input type="submit" value="Registrar" className="input-btn" onClick={handleSubmit} />

        </form>
      </div>
  </Column>
</Column.Group>

</Container>
    
  );
}

export default Register;