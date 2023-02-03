import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/navBar/NavBar";
import { getTemperaments } from "../../redux/actions";
import styles from "./NewDog.Module.css";
import imgBtn from '../../images/btnVolver.gif'
import axios from 'axios';
const ROUTE_DOG_POST = "https://api-dogs-g87z.onrender.com/dogs"//"http://localhost:3001/dogs"

export function NewDog(props) {
  const temps = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  let boxValue = { name: '', id: 0 };
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
      boxValue.name = event.target.value;
      const oneTemp = temps.find(element => element.name === boxValue.name);
      boxValue.id = oneTemp.id
      console.log(boxValue);
    } else {
      const value = event.target.value;
      const id = event.target.id;
      const name = event.target.name;
      console.log(id);
      setInput({ ...input, [name]: value, [id]: id });
      setError(validate({ ...input, [name]: value }));
    }
  };

  const handleEliminar = (event) => {
    event.preventDefault();
    let temporal = []
    const { temperament } = input;
    if (!boxValue.id) {
      for (let i = 0; i < temperament.length - 1; i++) {
        temporal.push(temperament[i])
      }
      setInput({ ...input, temperament: temporal });
    }
    else {
      temporal = temperament.filter(element => element.id !== boxValue.id);
      setInput({ ...input, temperament: temporal });
    }

  }
  //********************************************************************************** */
  function HandleSubmit(event) {
    event.preventDefault();
    if(Object.entries(error).length===0 && input.name){
      const dog = {
        name: input.name,
        height: input.heightMin + "-" + input.heightMax,
        weight: input.weightMin + "-" + input.weightMax,
        year_life: input.year_lifeMin + "-" + input.year_lifeMax,
        temperament: input.temperament.map(e => e.id),
        image: 'https://media.istockphoto.com/id/1392182937/vector/no-image-available-photo-coming-soon.jpg?s=170667a&w=0&k=20&c=HOCGNLwt3LkB92ZlyHAupxbwHY5X2143KDlbA-978dE='
      }
      axios.post(ROUTE_DOG_POST, dog)
        .then(data => alert('Dog Created'))
        .catch(error => console.log(error));
      setInput({
        name: "",
        heightMin: "0.1",
        heightMax: "0.2",
        weightMin: "1",
        weightMax: "2",
        year_lifeMin: "1",
        year_lifeMax: "2",
        temperament: [],
      });
    }else alert('debe ingresar los datos correctamente')
    
  }
  //*************************************************************************************** */
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.name === "addTemp" && boxValue.name !== "") {
      if (boxValue === "None") return alert("debe ingresar un valor valido");
      if (input.temperament.find(e=>e.id===boxValue.id))
        return alert("No se deben repetir los valores");
      arr.push(boxValue);
    }
    setInput({ ...input, temperament: [...input.temperament, ...arr] });
  };
  //*************************************************************************************** */
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
    <div className={styles.containerNewDog}>
      <NavBar />
      <div className={styles.cabecera}>
      <h3>Creacion de nuevo Dog</h3>
      
      </div>
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
                <option id={element.id} value={element.name} readOnly>
                  {element.name}{" "}
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
            <p>{element.name}</p>
          ))}
          <br />
          <button onClick={HandleSubmit}>Crear Perro</button>
        </form>
      </div>
      <div className={styles.btnBack}>
      <Link to="/home">
        <img src={imgBtn} alt="" />
      </Link>
      </div>
    </div>
  );
}
