import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export const Details = (props) => {
  let { id } = useParams();
  const [ficha, setFicha] = useState({});
///Hay que arreglar lo del paginado, ya que trae el perro
//del id 1 al 8 solamente

  useEffect(() => {
    console.log('trae este perro', id);
    fetch(`http://localhost:3001/dogs/${id}`)
    .then((response) => response.json())
    .then((dog) => {
       if (dog.name) {
        console.log(dog);
          setFicha(dog);
          console.log(ficha);
       } else {
          window.alert('No hay perros con ese ID');
       }
    })
    .catch((err) => {
       window.alert('No hay perros con ese ID');
    });
 return setFicha({});
  },[id]);

  return (
    <div>
      <Link to= '/home'>Regresar</Link>
      <div>
          <h3>Raza: {ficha.name}</h3>
          <h5>Temperamentos: {ficha.temperament}</h5>
          <h6>Altura (minima-Maxima): {ficha.height}</h6>
          <h6>Peso (Minimo-Maximo): {ficha.weight}</h6>
          <h6>Años de vida: {ficha.year_life}</h6>
      </div>
      <div>
          <img src={ficha.image?.url} alt="imagen del perro" />
      </div>
    </div>
  )
}
