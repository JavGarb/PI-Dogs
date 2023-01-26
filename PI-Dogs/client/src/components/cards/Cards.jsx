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
        id={dog.id}
        image={dog.image.url}
        name={dog.name}
        temperament={dog.temperament?dog.temperament.trim():'sin datos'}
        weight={dog.weight?dog.weight:'sin dato'}
        />
      })}
      
    </div>
  )
}

