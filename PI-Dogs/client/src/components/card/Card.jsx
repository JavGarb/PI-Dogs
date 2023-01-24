import React from 'react';
import style from './Card.Module.css';
import {Link} from 'react-router-dom';

export const Card = (props) => {
const id= parseInt(props.id);
 
  return (
    <div className={style.containerCard}>
      <Link className={style.title} to={`/details/${id+1}`}>
      <img className={style.image} src={props.image} alt="imagen" />
      <h3>{props.name}</h3>
      <h6>Peso: {props.weight.trim()}</h6>
      <h6>Temperamento: {props.temperament}</h6>
      </Link>
    </div>
  )
}


