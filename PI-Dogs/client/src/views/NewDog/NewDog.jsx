import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/navBar/NavBar";
import { getTemperaments } from "../../redux/actions";
import styles from "./NewDog.Module.css";

export function NewDog(props) {
  const temps = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  let boxValue = "";
  let arr = [];

  const [input, setInput] = useState({
    name: "",
    heightMin: "0.1",
    heightMax: "0.2",
    weightMin: "1",
    weightMax: "2",
    year_lifeMin: "1",
    year_lifeMax: "2",
    temperament: [],
  });
  const [error, setError] = useState({});

  const handleChange = (event) => {
    if (event.target.name === "temperament") {
      boxValue = event.target.value;
    } else {
      const value = event.target.value;
      const name = event.target.name;
      setInput({ ...input, [name]: value });
      setError(validate({ ...input, [name]: value }));
    }
  };

  const handleEliminar=(event)=>{
    event.preventDefault();
    let temporal=[]
    const {temperament} = input;
    if (boxValue==""){
      for(let i=0; i<temperament.length -1; i++){
        temporal.push(temperament[i])
      }
      setInput({ ...input, temperament: temporal });
    }
    else{
      temporal= temperament.filter(element=> element != boxValue);
      console.log(temporal);
      setInput({ ...input, temperament: temporal });
    }
    
  }

  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.name === "addTemp" && boxValue !== "") {
      if (boxValue === "None") return alert("debe ingresar un valor valido");
      if (input.temperament.includes(boxValue))
        return alert("No se deben repetir los valores");
      arr.push(boxValue);
    }
    setInput({ ...input, temperament: [...input.temperament, ...arr] });
  };

  function validate(dogState) {
    const errors = {};
    if (!/.[A-Za-z]{5,24}$/.test(dogState.name))
      errors.name = "Raza debe tener mas de 5 y menos de 25 caracteres";
    if (dogState.heightMin > dogState.heightMax)
      errors.height = "Altura Minima no puede ser mayor a la maxima";
    if (dogState.weightMin > dogState.weightMax)
      errors.weight = "Peso minimo no puede superar al maximo";
    if (dogState.year_lifeMin > dogState.year_lifeMax)
      errors.year_life = "Años de vida minimo no puede superar a maximo";
    return errors;
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <h3>Creacion de nuevo Dog</h3>
      <Link to="/home">Regresar</Link>
      <div className={styles.frmDog}>
        <form>
          <label>
            Raza:
            <input
              name="name"
              type="text"
              className={styles.inpRaza}
              value={input.name}
              onChange={handleChange}
            />
          </label>
          <p>{error.name}</p>
          <br />
          <label>
            Altura min-max
            <input
              name="heightMin"
              type="number"
              min="0.1"
              max="1.1"
              step="0.05"
              value={input.heightMin}
              onChange={handleChange}
            />
            {" - "}
            <input
              name="heightMax"
              type="number"
              min="0.2"
              max="1.2"
              step="0.05"
              value={input.heightMax}
              onChange={handleChange}
            />
            Mts
          </label>
          <p>{error.height}</p>
          <br />
          <label>
            Peso min-max
            <input
              name="weightMin"
              type="number"
              min="1"
              max="100"
              step="1"
              value={input.weightMin}
              onChange={handleChange}
            />
            {" - "}
            <input
              name="weightMax"
              type="number"
              min="1"
              max="100"
              step="1"
              value={input.weightMax}
              onChange={handleChange}
            />
            kilos
          </label>
          <p>{error.weight}</p>
          <br />
          <label>
            Años-vida min-max
            <input
              name="year_lifeMin"
              type="number"
              min="1"
              max="25"
              step="1"
              value={input.year_lifeMin}
              onChange={handleChange}
            />{" "}
            {" - "}
            <input
              name="year_lifeMax"
              type="number"
              min="1"
              max="25"
              step="1"
              value={input.year_lifeMax}
              onChange={handleChange}
            />
            años
          </label>
          <p>{error.year_life}</p>
          <br />
          <select
            name="temperament"
            id="temps"
            className={styles.cmbBox}
            onChange={handleChange}
            onBlur={handleChange}
          >
            <option value="None" selected>
              None
            </option>
            {temps?.map((element) => {
              return (
                <option value={element} readOnly>
                  {element}{" "}
                </option>
              );
            })}
          </select>
          <button
            className={styles.btnCrear}
            name="addTemp"
            onClick={handleClick}
          >
            Agregar Temperamento
          </button>
          <button 
          className={styles.btnCrear}
          onClick={handleEliminar}
          >Eliminar temperamento</button>
          {input.temperament?.map((element) => (
            <p>{element}</p>
          ))}
          <br />
        </form>
      </div>
    </div>
  );
}
