import React from 'react'
import style from './Card.Module.css'


export const Card = (props) => {
 
  return (
    <div className={style.container}>
      <img className={style.image} src={props.image} alt="imagen" />
      <h3>{props.name}</h3>
      <h6>Peso: {props.weight.trim()}</h6>
      <h6>Temperamento: {props.temperament}</h6>
    </div>
  )
}


