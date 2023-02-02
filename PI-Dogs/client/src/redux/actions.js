
export const GET_PAGE = "GET_PAGE";
export const SET_PAGE = "SET_PAGE";
export const GET_ALL = "GET_ALL";
export const GET_TEMP = "GET_TEMP";
export const SET_ARGS = "GET_ARGS";
export const GET_FOR_NAME = "GET_FOR_NAME";

const URL_DOGS = "https://api-dogs-g87z.onrender.com/dogs";
const URL_TEMPERAMENTS = "https://api-dogs-g87z.onrender.com/temperaments";
const GET_DOG_NAME = "https://api-dogs-g87z.onrender.com/dogs/?name=";

//trae el perro por nombre y lo asigna a la pagina para que se muestren, no tiene limites
export function getForName(value) {
    return (dispatch) => {
        fetch(GET_DOG_NAME + value, {mode:'no-cors'})
        .then(res => res.json())
        .then(data=> dispatch({ type: GET_FOR_NAME, payload:{paginated:data.slice(0,8), count:8 }}))
        .catch(error=> console.log(error));
    }
}

export function setArgs(args) {//args es un objeto con dos propiedades value y order
    return (dispatch) => {
        dispatch({ type: SET_ARGS, payload: args })
    }
}


export function getPage(page, order, value) {
    if (page < 1) return;
    return (dispatch) => {
        fetch(URL_DOGS + `?page=${page}&order=${order}&value=${value}`, {mode: 'no-cors'})
            .then(res => res.json())
            .then(data => dispatch({ type: GET_PAGE, payload: data }))
            .catch((error) => console.error(error));
    }
}

export function setPageFiltered(obj){
    return (dispatch)=>{
        dispatch({ type: GET_PAGE, payload: obj });
    }
}

export function getTemperaments() {
    return (dispatch) => {
        fetch(URL_TEMPERAMENTS, {mode:'no-cors'})
            .then(res => res.json())
            .then(data => dispatch({ type: GET_TEMP, payload: data }))
            .catch((error) => console.error(error));
    }
}

export function setPage(page) {
    return (dispatch) => {
        dispatch({ type: SET_PAGE, payload: page });
    }
}

export function getAll() {
    return (dispatch) => {
        fetch(URL_DOGS, {mode: 'no-cors'})
            .then(res => res.json())
            .then(data => dispatch({ type: GET_ALL, payload: data }))
            .catch((error) => console.error(error));
    }
}


//
