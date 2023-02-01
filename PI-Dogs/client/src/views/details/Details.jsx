import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Details.Module.css';
import imgBtn from '../../images/btnVolver.gif'


export const Details = (props) => {
  let { id } = useParams();
  const [ficha, setFicha] = useState({});
  ///Hay que arreglar lo del paginado, ya que trae el perro
  //del id 1 al 8 solamente

  useEffect(() => {
    console.log('trae este perro', id);
    fetch(`https://api-dogs-g87z.onrender.com/dogs/${id}`)
      .then((response) => response.json())
      .then((dog) => {
        if (dog.name) {
          setFicha(dog);
        } else {
          window.alert('No hay perros con ese ID');
        }
      })
      .catch((err) => {
        window.alert('No hay perros con ese ID');
      });
    return setFicha({});
  }, [id]);

  return (
    <div className={styles.containerDetails}>
      <div className={styles.containerFoto}>
        <div className={styles.image}>
          <img className={styles.foto} src={ficha.image?.url} alt="imagen del perro" />
        </div>
      </div>
      <div className={styles.text}>
        <h1>{ficha.name}</h1>
        <h5>{ficha.Temperaments}</h5>
        <h6>Altura (minima-Maxima): {ficha.height}</h6>
        <h6>Peso (Minimo-Maximo): {ficha.weight}</h6>
        <h6>Años de vida: {ficha.year_life}</h6>
      </div>
      <div className={styles.btn}>
        <Link  to='/home'>
          <img src={imgBtn} alt="" />
        </Link>
      </div>
    </div>
  )
}
