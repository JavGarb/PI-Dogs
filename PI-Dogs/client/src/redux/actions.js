
export const GET_PAGE="GET_PAGE";
export const SET_PAGE="SET_PAGE";

const URL_DOGS="http://localhost:3001/dogs"



export function getPage(page){
    if(page < 1)return;
    return (dispatch)=>{
        fetch(URL_DOGS + `?page=${page}`)
        .then(res=>res.json())
        .then(data=> dispatch({type:GET_PAGE, payload:data}))
        .catch((error)=> console.error(error));
    }
}

export function setPage(page){
    return (dispatch)=>{
        dispatch({type:SET_PAGE, payload:page});
    }
}

//