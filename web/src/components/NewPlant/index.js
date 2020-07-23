import React from 'react';
import { useHistory } from 'react-router-dom'
import api from "../../services/api";
api.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('jwtToken');

const NewPlant = () => {
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit new Plant');
    let scientificName = document.getElementById('nomeCientifico').value;
    let popularName = document.getElementById('nomeGenerico').value;
    let description = document.getElementById('msg').value;
    let plantType = document.getElementById('tipoPlanta').value;

    if(popularName.toString() === '' || description.toString() === ''
      || plantType.toString() === ''){
      return;
    }
    
    console.log(scientificName, popularName, description, plantType);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('sessionToken')
    }

    const data = {
      scientificName, popularName, description, comments: [], plantType
    }

    api.post('/api/plants', data, {headers: headers
    }).then(function (response){
      if(!response){
        // planta nao criada
        return;
      }
      // planta criada
      console.log(response);
      history.push('/');
    }).catch(function (err){
      console.log(err);
    });
  }

  return (
    <div className="form">
      <form action="" onSubmit={handleSubmit}>
        <h1>ADICIONAR PLANTA</h1>
        <label for="nomeGenerico" for="nomeG">Adicione um nome à Planta</label>
        <input type="text" placeholder="Nome Genérico da Planta" id="nomeGenerico" />
        <label for="nomeCientifico">Adicione o nome científico da planta</label>
        <input type="text" placeholder="Nome Científico da Planta (Opcional)" id="nomeCientifico" />
        <label for="tipoPlanta">Adicione o tipo da planta</label>
        <input type="text" placeholder="Tipo da Planta (ex: Flor)" id="tipoPlanta" />
        <label for="msg">Adicione uma descrição</label>
        <textarea id="msg" placeholder="Descrição da planta"></textarea>
        <button type="button">Adicionar Imagem</button>
        <input type="submit" value="Registrar Planta" 
          className="botão-submit" id="botão-planta" onClick={handleSubmit} 
        />
      </form>
    </div>
  );
}

{/* <label for="msg">Ultima data em que a regou: <br /></label>
<input type="date" id="date" /> */}

export default NewPlant;