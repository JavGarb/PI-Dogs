import React from "react";
import styles from "./SearchBar.Module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getPage, setArgs, getForName } from "../../redux/actions";



export const SearchBar = (props) => {
  //********************************************************************************* */
  //                         Declaraciones
  //********************************************************************************* */
  const temperaments = useSelector((state) => state.temperaments);
  const page = useSelector((state) => state.actualPage);
  const dispatch = useDispatch();
  const [radioBtn, setRadioBtn] = useState({
    order: "Ascendente",
    value: "Raza",
  });
  const [inputTxt, setInputTxt] = useState({value:''});
  //********************************************************************************* */
  //Funcion que maneja el boton de traer perro por nombre
  //********************************************************************************* */
  function handleClick(event) {
    //Solicitar al back por nombre
    if(event.target.name==='findName'){
      dispatch(getForName(inputTxt.value));
      
    }
  }
  //************************************************************************************ */
  // Maneja los ordenamientos por medio de los radioButton
  //************************************************************************************ */
  function handleInput(event) {
    if (event.target.name === "orden") {
      console.log(event.target.value);
      setRadioBtn({ ...radioBtn, order: event.target.value });
      dispatch(setArgs({order:event.target.value, value:radioBtn.value}));
    }
    if (event.target.name === "value") {
      console.log(event.target.value);
      setRadioBtn({ ...radioBtn, value: event.target.value });
      dispatch(setArgs({order:radioBtn.order, value: event.target.value}));
    }
  }

  //************************************************************************************* */
  //Maneja el estado del textbox para la busqueda
  //************************************************************************************** */
  function handleChange(event){
    if(event.target.name==='findName'){
      const txt = event.target.value;
      setInputTxt({...inputTxt, value: txt});
    }
  }

  //************************************************************************************* */

  useEffect(() => {
    dispatch(getPage(page, radioBtn.order, radioBtn.value));
  }, [radioBtn]);

  //************************************************************************************* */
  return (
    <>
      <div className={styles.find}>
        <h3>Busqueda</h3>
        <label htmlFor="findName">Raza</label>
        <input type="text" name="findName" onChange={handleChange} value={inputTxt.value} className={styles.txt} />
        <button name="findName" onClick={handleClick}>Buscar</button>
      </div>
      <form className={styles.containerFrm}>
        <div className={styles.order}>
          <h3>Ordenar perros:</h3>
          <h6>
            Ascendente
            <input
              type="radio"
              name="orden"
              id="1"
              value="Ascendente"
              onInput={handleInput}
            />
          </h6>
          <h6>
            Descendente
            <input
              type="radio"
              name="orden"
              id="2"
              value="Descendente"
              onInput={handleInput}
            />
          </h6>
        </div>
        <div className={styles.value}>
          <h3>Por Raza o por Peso:</h3>
          <h6>
            Raza:
            <input
              type="radio"
              name="value"
              value="Raza"
              id="3"
              onInput={handleInput}
            />
          </h6>
          <h6>
            Peso:
            <input
              type="radio"
              name="value"
              value="Peso"
              id="4"
              onInput={handleInput}
            />
          </h6>
        </div>
        <div className={styles.filter}>
          <h4>Filtrar por Temperamento</h4>
          <label htmlFor="filter">Filtro</label>
          <select name="temperamentos" id="temps">
            <option value="none">none</option>
            {temperaments?.map((element) => (
              <option value={element.id}>{element.name}</option>
            ))}
          </select>
        </div>
        
      </form>
    </>
  );
};
