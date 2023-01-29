import {GET_PAGE, SET_PAGE, GET_ALL, GET_TEMP, SET_ARGS, GET_FOR_NAME} from '../redux/actions'

const initialState= {
    user:{},//guardo el usuario
    favorites:[],//guardo los favoritos del usuario
    page:[],//guardo el array de la pagina actual, ordenado, filtrado o por name
    allDogs:[],//guardo todos los dogs ordenados para hacer los filtros
    login:false,//guardo si hay usuario logueado
    actualPage:0,//pagina actual
    temperaments:[],
    actualArgs:{value:'Asendente', order:'Raza'},//guarda los argumentos de getDogs
}

const reducer = ( state = initialState , action)=>{
    
    switch(action.type){
        case GET_FOR_NAME:
            return {...state, page:action.payload}
        case SET_ARGS:
            return {...state, actualArgs:action.payload}
        case GET_TEMP:
            return {...state, temperaments:action.payload}
        case GET_PAGE:
            return {...state, page:action.payload};
        case SET_PAGE:
            return {...state, actualPage:action.payload};
        case GET_ALL:
            return {...state, allDogs:action.payload};
        default:
            return {...state};
    }

};


export default reducer;