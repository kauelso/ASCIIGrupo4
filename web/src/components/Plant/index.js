import React from 'react';
import './styles.css';

import { FaFileArchive, FaHeart } from 'react-icons/fa';
import { GiWateringCan } from 'react-icons/gi';

const Plant = (props) => {
  return (
    <div className="plant-container">
      
      <img src={props.plantImage} alt="foto da planta"/>
      
      <div className="plant-info">
        <h1>{props.plantName}</h1>
        <p>{props.plantType} <span>{props.plantDate}</span></p>
      </div>

      <p>Regada pela ultima vez {props.plantTime} horas atras</p>
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
  );
}

export default Plant;