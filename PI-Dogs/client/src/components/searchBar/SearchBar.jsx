import React from 'react';
import styles from './SearchBar.Module.css';


export const SearchBar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.order}>
        <h3>Ordenar perros:</h3>
        <h6>Orden Descendente<input type="radio" name="orden" id="2" checked="true" /></h6>
        <h6>Orden Ascendente<input type="radio" name="orden" id="1" /></h6>
      </div>
      <div className={styles.value}>
      <h3>Por Raza o por Peso:</h3>
        <h6>Raza:<input type="radio" name="por" id="1" checked='true' /></h6>
        <h6>Peso:<input type="radio" name="por" id="2" /></h6>
      </div>
      <div className={styles.find}>
        <h4>Busqueda</h4>
        <label htmlFor="find">Ingrese Nombre de la raza</label>
        <input type="text" name='find' className={styles.txt} />
        <button>Buscar</button>
      </div>
      <div className={styles.filter}>
        <h4>Filtrar</h4>
        <label htmlFor="filter">Filtro</label>
        
      </div>
    </div>
  )
}

