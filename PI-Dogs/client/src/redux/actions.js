
export const GET_PAGE="GET_PAGE";
export const SET_PAGE="SET_PAGE";
export const GET_ALL="GET_ALL";
export const GET_TEMP="GET_TEMP";

const URL_DOGS="http://localhost:3001/dogs"
const URL_TEMPERAMENTS="http://localhost:3001/temperaments"



export function getPage(page){
    if(page < 1)return;
    return (dispatch)=>{
        fetch(URL_DOGS + `?page=${page}`)
        .then(res=>res.json())
        .then(data=> dispatch({type:GET_PAGE, payload:data}))
        .catch((error)=> console.error(error));
    }
}

export function getTemperaments(){
    return (dispatch)=>{
        fetch(URL_TEMPERAMENTS)
        .then(res=>res.json())
        .then(data=> dispatch({type:GET_TEMP, payload:data}))
        .catch((error)=> console.error(error));
}
}

export function setPage(page){
    return (dispatch)=>{
        dispatch({type:SET_PAGE, payload:page});
    }
}

export function getAll(){
    return (dispatch)=>{
        fetch(URL_DOGS)
        .then(res=>res.json())
        .then(data=> dispatch({type:GET_ALL, payload:data}))
        .catch((error)=> console.error(error));
    }
}


//