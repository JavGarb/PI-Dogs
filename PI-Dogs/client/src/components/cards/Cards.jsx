import React from 'react';
import {Card} from '../card/Card'
import {useSelector} from 'react-redux'
import styles from './Cards.Module.css'




export const Cards = (props) => {

const {paginated}= useSelector(state=> state.page);



  return (
    <div className={styles.containerCards}>
      {paginated?.map((dog,index)=>{
        return <Card 
        id={dog.id?dog.id:'Sin Datos'}
        image={dog.image.url?dog.image.url:'https://media.istockphoto.com/id/1216251206/vector/no-image-available-icon.jpg?s=612x612&w=0&k=20&c=6C0wzKp_NZgexxoECc8HD4jRpXATfcu__peSYecAwt0='}
        name={dog.name}
        temperament={dog.temperament?dog.temperament.trim():'sin datos'}
        weight={dog.weight?dog.weight:'sin dato'}
        />
      })}
      
    </div>
  )
}

