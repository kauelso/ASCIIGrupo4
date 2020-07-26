import React from 'react';
import './styles.css';

import { FaFileArchive, FaHeart } from 'react-icons/fa';
import { GiWateringCan } from 'react-icons/gi';

const Plant = (props) => {
  let parsedTime =(props.plantDate.slice(0,10) +" "+props.plantDate.slice(11,16));
  return (
    <div className="plant-container">
      <div className="plant-side">
        <img src={props.plantImage} alt="foto da planta"/>
        
        <div className="plant-info">
          <h1>{props.plantName}</h1>
          <p>{props.plantType} <span>{parsedTime}</span></p>
        </div>
      </div>

      <div className="plant-body">
        <p>Regada {props.plantTime} horas atrás</p>
        <div className="plant-actions">
          <button className="plant-action" onClick={props.plantAguar}>
            <h1><GiWateringCan/></h1>
            <p>Aguar</p>
          </button>

          <button className="plant-action" onClick={props.plantArchive}>
            <h1><FaFileArchive/></h1>
            <p>Arquivar</p>
          </button>

          <button className="plant-action" onClick={props.plantFavorite}>
            <h1 id="favoriteIcon"><FaHeart/></h1>
            <p>Favoritar</p>
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Plant;