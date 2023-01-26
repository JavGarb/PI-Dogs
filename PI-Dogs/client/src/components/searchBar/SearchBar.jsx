import React from 'react';
import styles from './SearchBar.Module.css';
import { useSelector } from 'react-redux';


export const SearchBar = (props) => {
  const temperaments = useSelector(state => state.temperaments)
  function handleClick() {
    //Solicitar al back por nombre

  }
  return (
    <>
        <div className={styles.find}>
          <h3>Busqueda</h3>
          <label htmlFor="name">Raza</label>
          <input type="text" name='name' className={styles.txt} />
          <button onClick={handleClick}>Buscar</button>
        </div>
    <form className={styles.containerFrm}>
      <div className={styles.order}>
        <h3>Ordenar perros:</h3>
        <h6>Descendente<input type="radio" name="orden" id="2" checked="true" /></h6>
        <h6>Ascendente<input type="radio" name="orden" id="1" /></h6>
      </div>
      <div className={styles.value}>
        <h3>Por Raza o por Peso:</h3>
        <h6>Raza:<input type="radio" name="por" id="1" checked='true' /></h6>
        <h6>Peso:<input type="radio" name="por" id="2" /></h6>
      </div>
        <div className={styles.filter}>
          <h4>Filtrar por Temperamento</h4>
          <label htmlFor="filter">Filtro</label>
          <select name="temperamentos" id="temps">
          <option value='none'>none</option>
            {temperaments?.map(element => <option value={element}>{element}</option>)}
          </select>
        </div>
    </form>
      </>
  )
}

