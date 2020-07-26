import React, { useState, useEffect   } from 'react';
import './styles.css';

import Plant from '../Plant';

import api from '../../services/api';

const MinhasPlants = () => {
  
  const [plantas, setPlantas] = useState([]);
  const [attPage, setAttPage] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
  }
  
  useEffect(()=>{
    api.get('/api/plants', {headers: headers})
      .then(function (response){
        console.log(response);
        setPlantas(response.data.plants);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [attPage]);
  
  function hasHours(params){
    console.log('Params:'+params);
    const now = new Date();
    const waterAt = new Date(params);
    const diff = Math.abs(now.getTime() - waterAt.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours;
  }

  async function handleArchive(id){
    api.put('/api/plants/archive/'+id, {}, {headers: headers})
    .then(function (response){ 
      setAttPage(true);
    }).catch(function (err){
      // console.log(err);
    });
  }

  async function handleFavorite(id){
    api.put('/api/plants/favorite/'+id, {}, {headers: headers})
    .then(function (response){
      setAttPage(true);
      document.getElementById('favoriteIcon').setAttribute('styles', 'color= #0d7');
    }).catch(function (err){
      // console.log(err);
    });
  }

  async function handleAguar(id){
    api.put('/api/plants/aguar/'+id, {}, {headers: headers})
    .then(function (response){
      setAttPage(true);
    }).catch(function (err){
      // console.log(err);
    });
  }

  function handleFiltros(){
    console.log('filtrando')
    const filtro = document.getElementById('appearance-select').value;
    console.log(filtro);
    if(filtro === '1'){//por data
      api.get('/api/plants', {headers: headers})
        .then(function (response){
          // console.log(response);
          setPlantas(response.data.plants);
        })
        .catch(function (err) {
          // console.log(err);
        });
    }else if(filtro === '2'){// favoritas
      api.get('/api/plants/favorites', {headers: headers})
        .then(function (response){
          // console.log(response);
          setPlantas(response.data.plants);
        })
        .catch(function (err) {
          // console.log(err);
        });
    }else if(filtro === '3'){//arquivadas
      api.get('/api/plants/archived', {headers: headers})
        .then(function (response){
          // console.log(response);
          setPlantas(response.data.plants);
        })
        .catch(function (err) {
          // console.log(err);
        });
    }
  }

  return (
    <div className="myplants-container">
      {/* <SelectPage /> */}
      <select id="appearance-select" onChange={handleFiltros} onSubmit={handleFiltros}>
        <option value="" >Aplicar filtros</option>
        <option value="1" >Data de postagem crescente</option>
        <option value="2" >Favoritas</option>
        <option value="3" >Arquivadas</option>
      </select>
      <ul>
        { plantas.map(plant => (
          <li key={plant._id}>
            <Plant plantType={plant.plantType} plantName={plant.popularName} plantID={plant._id}
              plantTime={hasHours(plant.wateredAt)} plantDate={plant.createdAt} 
              plantImage={`http://localhost:4033/files/${plant.plantImage}`}
              plantArchive={()=>handleArchive(plant._id)}
              plantAguar={()=>handleAguar(plant._id)}
              plantFavorite={()=>handleFavorite(plant._id)}/>
          </li>
        ))}
        
      </ul>
    </div>
  ); 
}

export default MinhasPlants;