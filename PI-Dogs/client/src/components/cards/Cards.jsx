import React from 'react';
import {Card} from '../card/Card'
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styles from './Cards.Module.css'




export const Cards = (props) => {

const {paginated, count}= useSelector(state=> state.page);
const distpatch= useDispatch();



  return (
    <div className={styles.container}>
      {paginated?.map((dog,index)=>{
        return <Card 
        id={index}
        image={dog.image.url}
        name={dog.name}
        temperament={dog.temperament?dog.temperament.trim():'sin datos'}
        weight={dog.weight?dog.weight:'sin dato'}
        />
      })}
      
    </div>
  )
}

