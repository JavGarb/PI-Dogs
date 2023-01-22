import React from 'react';
import styles from './SearchBar.Module.css';


export const SearchBar = (props) => {
  return (
    <div className={styles.container}>
      <div>
        <h3>Ordenar perros:</h3>
        <h6>Orden Descendente<input type="radio" name="orden" id="2" checked="true" /></h6>
        <h6>Orden Ascendente<input type="radio" name="orden" id="1" /></h6>
      </div>
      <div>
      <h3>Por Raza o por Peso:</h3>
        <h6>Raza:<input type="radio" name="por" id="1" checked='true' /></h6>
        <h6>Peso:<input type="radio" name="por" id="2" /></h6>
      </div>
    </div>
  )
}

