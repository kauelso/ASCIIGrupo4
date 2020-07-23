import React from "react";

import api from '../../services/api';

const UserSettings = () => {
  function handleSubmit(event) {
    console.log("alterar usuario");
    event.preventDefault();
    let altNome = document.getElementById('Altnome');
    let altEmail = document.getElementById('Altemail');
    let altSenha1 = document.getElementById('Altsenha1');
    let oldPassword = document.getElementById('oldPassword');
    let altSenha2 = document.getElementById('Altsenha2');
    
    oldPassword.classList.remove('red');
    altSenha2.classList.remove('red');
    altSenha1.classList.remove('red');

    if( altSenha1.value.toString() === "" &&
      altSenha2.value.toString() === "" &&
      oldPassword.value.toString() === "" &&
      altEmail.value.toString() === ""){
        console.log('');
        return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('sessionToken')
    };

    //chamada a api para alterar o nome
    if(altNome.value.toString() !== '' && 
      altNome.value.toString() !== localStorage.getItem('sessionName')){
      api.put(`api/auth/user/${localStorage.getItem('sessionUID')}`,
        {name: altNome.value, email: altEmail.value}, {headers: headers})
      .then(function (response) {
        if(!response){
          // falha usuario nao alterado
          console.log("falha usuario n alterado")
        }
        // sucesso usuario alterado
        localStorage.setItem('sessionName', altNome.value);
        console.log("usuario alterado")
      }).catch(function (err){
        // erro usuario nao alterado
        console.log(err);
        console.log("erro usario nao alterado")
      });
    }

    if(oldPassword.value.toString() === ""){
      oldPassword.classList.add('red');
      console.log("erro senha atual nao informada");
      return;
    }

    if(altSenha1.value.toString() !== altSenha2.value.toString()){
      altSenha1.classList.add('red');
      altSenha2.classList.add('red');
      console.log("erro alterar senha");
      return;
    }
    const dataSenhas = {
      email: altEmail.value,
      oldPassword: oldPassword.value,
      newPassword: altSenha1.value
    };

    //chamada a api para alterar a senha
    if(altSenha1.value.toString() === altSenha2.value.toString()){
      api.put(`/api/auth/user/change_password/${localStorage.getItem('sessionUID')}`,
        dataSenhas,{headers: headers})
      .then(function (response){
        if(response){
          // senha alterada
          oldPassword.classList.remove('red');
          console.log("senha alterada")
        }
        else {          
          console.log("erro senha nao alterada");
          //senha nao alterada
        }
      }).catch(function (err){
        // nao foi possivel alterar a senha
        console.log(err);
        console.log("erro alterar senha")
      });
    }  
    oldPassword.classList.add('red');
    console.log("erro alterar senha")  
  }

  return (
    <div className="form">
      <form action="" onSubmit={handleSubmit}>
        <h1>ALTERAR DADOS</h1>
        <label className="nomeG" >Altere seu nome</label>
        <input type="text" placeholder={localStorage.getItem('sessionName')} id="Altnome"/>
        <label >Este é o seu e-mail</label>
        <input type="email" id="Altemail" name="Altemail" value={localStorage.getItem('sessionEmail')} readOnly="readonly"/>
        <label >Altere sua senha</label>
        <input type="password" placeholder="Sua senha atual" id="oldPassword" name="oldPassword" onChange={()=>{document.getElementById('oldPassword').classList.remove('red')}}/>
        <label >Escolha sua nova senha</label>
        <input type="password" placeholder="Sua nova senha" id="Altsenha1" onChange={()=>{document.getElementById("Altsenha1").classList.remove('red')}} />
        <label >Confirme sua nova senha</label>
        <input type="password" placeholder="Confirme sua nova senha" id="Altsenha2" name="Altsenha2" onChange={()=>{document.getElementById("Altsenha2").classList.remove('red')}}/>
        <input type="submit" value="Registrar Alterações" className="botão-submit" 
          id="botão-planta" onClick={handleSubmit}/>
      </form>
    </div>
  );
}

export default UserSettings;