import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import api from "../../services/api";
api.defaults.headers.common['Authorization'] = 
                                'Bearer ' + localStorage.getItem('jwtToken');

const NewPlant = () => {
  const history = useHistory();
  const [sucesso, setSucesso] = useState(false);
  let plantImage = undefined;
  

  function onChangeHandler(event){

    plantImage = event.target.files[0];

}

  function handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit new Plant');
    let scientificName = document.getElementById('nomeCientifico');
    let popularName = document.getElementById('nomeGenerico');
    let description = document.getElementById('msg');
    let plantType = document.getElementById('tipoPlanta');
    let inputPlant = document.getElementById('img');
    let filename = undefined;

    if(popularName.value.toString() === '' || description.value.toString() === ''
      || plantType.value.toString() === ''){
      
      let plantError = document.getElementById('plantError');
      scientificName.value = "";
      popularName.value = "";
      description.value = "";
      plantType.value = "";
      plantError.classList.remove('hidden');
      return;
    }
    
    // console.log(scientificName, popularName, description, plantType);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('sessionToken')
    }

    const data = {
      scientificName: scientificName.value, popularName: popularName.value,
      description: description.value, comments: [], plantType: plantType.value
    }

    const fileHeader = {
      'content-Type': 'multipart/form-data',
    }

    const plantData = new FormData();
    plantData.append('file',plantImage);

  //   api.post('/api/imageupload/post',plantData,fileHeader)
  //   .then(res => {
  //     console.log(res.data + 'this is data after api call');
  //  })
  //  .catch(err => console.log(err));

    api.post('/api/plants', data, {headers: headers
    }).then(function (response){
      if(!response){
        // planta nao criada
        return;
      }
      // planta criada
      console.log(response);
      setSucesso(true);

      api.post('/api/imageupload/post',plantData,fileHeader)
    .then(function(res) {
      filename = res.data.filename;
      console.log(response)
      console.log(response.data.plant._id);
      console.log(filename)
      api.put('/api/plants/putimg/'+ response.data.plant._id,{plantImage:filename},{headers:headers})
   })
   .catch(err => console.log(err));
      let plantError = document.getElementById('plantError');
      scientificName.value = "";
      popularName.value = "";
      description.value = "";
      plantType.value = "";
      plantError.classList.add('hidden');
    }).catch(function (err){
      // console.log(err);
      setSucesso(false);
      let plantError = document.getElementById('plantError');
      plantError.classList.remove('hidden');
    });
  }

  return (
    <div className="form">
      <form action="" onSubmit={handleSubmit} enctype="multipart/form-data">
        <h1>ADICIONAR PLANTA</h1>
        <label for="nomeGenerico" for="nomeG">Adicione um nome à Planta</label>
        <input type="text" placeholder="Nome Genérico da Planta" id="nomeGenerico" />
        <label for="nomeCientifico">Adicione o nome científico da planta</label>
        <input type="text" placeholder="Nome Científico da Planta (Opcional)" id="nomeCientifico" />
        <label for="tipoPlanta">Adicione o tipo da planta</label>
        <input type="text" placeholder="Tipo da Planta (ex: Flor)" id="tipoPlanta" />
        <label for="msg">Adicione uma descrição</label>
        <textarea id="msg" placeholder="Descrição da planta"></textarea>
        <input type="file" name="file" onChange={onChangeHandler} id='img'/>
        <p id="plantError"  className="hidden">Não foi possível criar a planta, tente novamente!</p>
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